import * as fs from "fs";
import micromatch from "micromatch";
import { builtinModules } from "module";
import * as path from "path";
import type {
  OutputBundle,
  OutputChunk,
  PluginContext,
  RollupOptions,
} from "rollup";
import type { ChunkMetadata, Plugin, UserConfig } from "vite";

import { findRenderChunk } from "./bundle.js";
import { getEntrySrc } from "./html.js";
import {
  FollowLinksConfig,
  PrerenderConfig,
  renderStaticPages,
  urlToFileName,
} from "./prerender.js";

export interface Wrapper {
  server?: string;
  client?: string;
  spa?: string;
}
export interface Adapter {
  hydrate: string;
  island: Wrapper;
  lagoon: Wrapper;
  injectWrapper?: "onLoad" | "onTransform";
}

export interface BuildArgs {
  outDir: string;
  template: string;
  ssrBundle: string;
  manifest: Record<string, string[]>;
  prerendered: string[];
}
export interface BuildTarget {
  config?: Plugin["config"];
  build: (args: BuildArgs) => Promise<void>;
}
export interface CapriPluginOptions {
  spa?: string | false;
  createIndexFiles?: boolean;
  ssrFormat?: "commonjs" | "esm";
  prerender?: PrerenderConfig;
  followLinks?: FollowLinksConfig;
  islandGlobPattern?: string;
  lagoonGlobPattern?: string;
  target?: BuildTarget;
  adapter: Adapter;
}

export type CapriAdapterPluginOptions = Omit<CapriPluginOptions, "adapter">;

export function capri({
  createIndexFiles = true,
  prerender = "/",
  followLinks = true,
  islandGlobPattern = "/src/**/*.island.*",
  lagoonGlobPattern = "/src/**/*.lagoon.*",
  ssrFormat = "esm",
  adapter,
  target,
  spa,
}: CapriPluginOptions): Plugin[] {
  let mode: "client" | "server" | "spa";
  let ssr: string;
  let root: string;
  let base: string;

  const { injectWrapper = "onLoad" } = adapter;

  /**
   * Test if id matches the given glob pattern. If so, check if a wrapper
   * is provided by the adapter and set the meta data accordingly.
   */
  function resolveWrapper(id: string, pattern: string, candidates: Wrapper) {
    if (micromatch.contains(id, pattern)) {
      const wrapper = candidates[mode];
      if (wrapper) {
        return {
          id,
          meta: { wrapper, wrapped: id },
        };
      }
    }
  }

  /**
   * Load the wrapper as requested in the meta data.
   * In the wrapper code, two replacements are applied:
   *
   * - "virtual:capri-component" -> the wrapped module + "?unwrapped"
   * - "%COMPONENT_ID%" -> the Id of the wrapped component (relative to the root)
   */
  function loadWrapper(meta: { wrapper: string; wrapped: string }) {
    const { wrapper, wrapped } = meta;

    // Note: we add the basename so that the extension stays the same...
    const unwrappedId = wrapped + "?unwrapped=" + path.basename(wrapped);

    const componentId = wrapped.startsWith(root)
      ? wrapped.slice(root.length)
      : wrapped;

    const template = fs.readFileSync(wrapper, "utf8");
    return template
      .replace(/virtual:capri-component/g, unwrappedId)
      .replace(/%COMPONENT_ID%/g, componentId);
  }

  return [
    {
      name: "vite-plugin-capri",

      // we need to modify the bundle before vite:build-html runs
      enforce: "pre",

      config(config, { command }) {
        if (config.build?.ssr) {
          mode = "server";
        } else if (command === "serve") {
          // running in dev server
          mode = "spa";
        } else {
          mode = "client";
        }

        root = path.resolve(config.root ?? "");
        // Allow base to be set via env:
        base = config.base ?? process.env.BASE_URL ?? "/";

        if (spa) spa = urlToFileName(spa, createIndexFiles, base);

        if (mode === "server") {
          ssr = getServerEntryScript(config);
          return {
            base,
            define:
              ssrFormat === "commonjs"
                ? {
                    "process.env.SSR": "true",
                  }
                : {
                    // import.meta.env.SSR is exposed by Vite
                  },
            ssr: {
              // The capri packages can't be externalized as they need to be
              // processed by Vite (virtual modules and glob imports).
              noExternal: ["capri", /@capri-js\//],
            },
            build: {
              ssr,
              emptyOutDir: false, // keep the client build
              rollupOptions: {
                output: {
                  format: ssrFormat,
                },
              },
            },
          };
        } else {
          let rollupOptions: RollupOptions = {};
          if (isServerEntryScript(config)) {
            // index.html points to a .server.* file
            // This implies that the site can't be rendered as SPA.
            if (spa) {
              throw new Error(
                "In order to generate an SPA, index.html must point to a client entry file."
              );
            }
            // We nevertheless want Vite to perform a client-build in order to
            // extract all assets. As most server-side rendering solutions use
            // node built-ins we mark them as external so that Rollup doesn't
            // try to bundle them (which would fail).
            rollupOptions = {
              external: builtinModules,
            };
          } else if (spa) {
            // Generate two entry chunks:
            rollupOptions = {
              input: {
                index: "/index.html",
                spa,
              },
            };
          }
          return {
            base,
            build: {
              ssrManifest: true,
              rollupOptions,
            },
          };
        }
      },
      async resolveId(source, importer, options) {
        if (source === spa) {
          return resolveFile(this, spa);
        }
        if (source === "virtual:capri-hydration") {
          return { id: "\0virtual:capri-hydration", moduleSideEffects: true };
        }
        if (source === "virtual:capri-hydrate") {
          return this.resolve(adapter.hydrate);
        }
        if (!source.includes("?unwrapped")) {
          const resolved = await this.resolve(source, importer, {
            ...options,
            skipSelf: true,
          });
          if (resolved) {
            return (
              resolveWrapper(resolved.id, islandGlobPattern, adapter.island) ??
              resolveWrapper(resolved.id, lagoonGlobPattern, adapter.lagoon)
            );
          }
        }
      },
      async load(id) {
        if (spa && id.endsWith(spa)) {
          const index = await resolveIndexHtml(this);
          return fs.readFileSync(index, "utf8");
        }
        if (id === "\0virtual:capri-hydration") {
          const file = new URL("./virtual/hydration.js", import.meta.url)
            .pathname;
          return fs
            .readFileSync(file, "utf8")
            .replace(/%ISLAND_GLOB_PATTERN%/g, islandGlobPattern);
        }
      },
      async buildStart() {
        if (mode === "client") {
          // Add the hydration code to the bundle
          this.emitFile({
            id: "virtual:capri-hydration",
            type: "chunk",
            name: "hydrate",
          });
        }
      },
      async generateBundle(options, bundle) {
        if (mode === "client") {
          // Modify the bundle so that the index.html file will load the
          // "hydrate" rather than the "index" chunk but will still include
          // all the original assets:

          let indexModuleId: string;
          let indexMetadata: ChunkMetadata;

          Object.values(bundle).forEach((chunk) => {
            if (
              chunk.type === "chunk" &&
              chunk.facadeModuleId &&
              chunk.name === "index"
            ) {
              // Remember the id and the assets of the index.html file...
              indexModuleId = chunk.facadeModuleId;
              indexMetadata = chunk.viteMetadata;

              // Merge viteMetadata of imports. When code is split, assets
              // can move further down in the tree.
              gatherCss(chunk, bundle, indexMetadata.importedCss);

              // Set the facadeModuleId to null so that vite:build-html does
              // not add script tags for it:
              chunk.facadeModuleId = null;
            } else if (chunk.type === "chunk" && chunk.name === "hydrate") {
              // Set the facadeModuleId of the hydration code to the id of
              // the index.html module so that vite:build-html creates a
              // script tag for it:
              chunk.facadeModuleId = indexModuleId;
              chunk.viteMetadata = indexMetadata;
            }
          });
        }
      },
      async writeBundle(options, bundle) {
        if (mode === "server") {
          const chunk = findRenderChunk(bundle, ssr);
          const outDir = options.dir!;

          // Read the index.html so we can use it as template for all prerendered pages.
          const template = fs.readFileSync(
            path.join(options.dir!, "index.html"),
            "utf8"
          );

          const ssrBundle = path.resolve(options.dir!, chunk.fileName);
          const manifest = readManifest(outDir);

          // Prerender pages...
          const prerendered = await renderStaticPages({
            outDir,
            template,
            ssrBundle,
            manifest,
            prerender,
            createIndexFiles,
            base,
            followLinks,
          });
          if (target) {
            await target.build({
              outDir,
              template,
              ssrBundle,
              manifest,
              prerendered,
            });
          }
          fs.unlinkSync(ssrBundle);
        }
      },
    },
    injectWrapper === "onLoad"
      ? {
          name: "capri-load",
          load(id) {
            const info = this.getModuleInfo(id);
            if (isWrapperInfo(info)) return loadWrapper(info.meta);
          },
        }
      : {
          name: "capri-transform",
          enforce: "post",
          transform(code, id) {
            const info = this.getModuleInfo(id);
            if (isWrapperInfo(info)) return loadWrapper(info.meta);
          },
        },
    {
      name: "capri-target",
      // Allow build targets to modify the config...
      config: target?.config,
    },
  ];
}

function getEntryScript(config: UserConfig) {
  const indexHtml = path.resolve(config.root ?? "", "index.html");
  const src = getEntrySrc(fs.readFileSync(indexHtml, "utf8"));
  if (!src) throw new Error(`Can't find entry script in ${indexHtml}`);
  return path.join(path.resolve(config.root ?? ""), src);
}

function getServerEntryScript(config: UserConfig) {
  const clientEntryScript = getEntryScript(config);
  const f = clientEntryScript.replace(
    /(\.client|\.server)?(\.[^.]+)$/,
    ".server$2"
  );
  if (!fs.existsSync(f)) {
    throw new Error(
      `File not found: ${f}. Make sure to name your server entry file accordingly.`
    );
  }
  return f;
}

export function isServerEntryScript(config: UserConfig) {
  const entryScript = getEntryScript(config);
  return /\.server\.[^.]+$/.test(entryScript);
}

async function resolveFile(ctx: PluginContext, f: string) {
  const index = await resolveIndexHtml(ctx);
  return path.join(path.dirname(index), f);
}

async function resolveIndexHtml(ctx: PluginContext) {
  const index = await ctx.resolve("/index.html");
  if (!index) throw new Error("Can't resolve index.html");
  return index.id;
}

function gatherCss(chunk: OutputChunk, bundle: OutputBundle, css: Set<string>) {
  function visit(chunk: OutputChunk) {
    chunk.viteMetadata.importedCss.forEach((file) => {
      css.add(file);
    });
    chunk.imports.forEach((file) => {
      const importee = bundle[file];
      if (importee?.type === "chunk") {
        visit(importee);
      }
    });
  }
  visit(chunk);
}

interface MetaInfo {
  meta: object;
}

interface WrapperInfo extends MetaInfo {
  meta: {
    wrapper: string;
    wrapped: string;
  };
}

function isMetaInfo(obj: unknown): obj is MetaInfo {
  return !!obj && typeof obj === "object" && "meta" in obj;
}

function isWrapperInfo(obj: unknown): obj is WrapperInfo {
  if (isMetaInfo(obj)) {
    const { meta } = obj;
    return (
      !!meta &&
      typeof meta === "object" &&
      "wrapper" in meta &&
      "wrapped" in meta
    );
  }
  return false;
}

function readManifest(dir: string) {
  try {
    const f = path.join(dir, "ssr-manifest.json");
    if (fs.existsSync(f)) {
      const json = fs.readFileSync(f, "utf8");
      const entries = Object.entries(JSON.parse(json))
        .filter(([id]) => !id.startsWith("\0"))
        .map(([id, chunks]) => [path.resolve("/", id), chunks]);

      return Object.fromEntries(entries) as Record<string, string[]>;
    }
  } catch (err) {
    console.error("Failed to load ssr-manifest.json");
    console.error(err);
  }
  return {};
}
