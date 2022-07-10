import type { BuildOptions } from "esbuild";
import micromatch from "micromatch";
import { builtinModules } from "module";
import * as path from "path";
import type {
  OutputBundle,
  OutputChunk,
  PluginContext,
  RollupOptions,
} from "rollup";
import type {
  ChunkMetadata,
  ConfigEnv,
  Plugin,
  SSROptions,
  UserConfig,
} from "vite";

import { createBundler } from "./bundle.js";
import { getEntrySrc } from "./html.js";
import { fsutils } from "./index.js";
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
  rootDir: string;
  outDir: string;
  ssrBundle: string;
  prerendered: string[];
  fsutils: typeof fsutils;
  bundle: (
    input: string,
    output: string,
    options?: BuildOptions
  ) => Promise<void>;
}

interface ViteConfig extends UserConfig {
  ssr?: SSROptions;
}
export interface BuildTarget {
  config?: (
    config: ViteConfig,
    env: ConfigEnv
  ) => ViteConfig | null | void | Promise<ViteConfig | null | void>;
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

  const ssr = resolveRelative("./virtual/ssr.js");

  let serverEntry: string;

  /** The project's root directory as defined in Vite config or the cwd */
  let rootDir: string;

  /** Absolute path of the build output dir */
  let outDir: string;

  /** The BASE_URL */
  let base: string;

  /** The content of index.html as genereated by the client build */
  let template: string;

  let manifest: Record<string, string[]>;

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

    const componentId = wrapped.startsWith(rootDir)
      ? wrapped.slice(rootDir.length)
      : wrapped;

    const template = fsutils.read(wrapper);
    return template
      .replace(/virtual:capri-component/g, unwrappedId)
      .replace(/%COMPONENT_ID%/g, componentId);
  }

  return [
    {
      // Allow build targets to modify the config
      name: "vite-plugin-capri-target",

      // Needs to run before the main plugin
      enforce: "pre",

      config: target?.config,
    },
    {
      name: "vite-plugin-capri-main",

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

        rootDir = path.resolve(config.root ?? "");

        outDir = path.resolve(rootDir, config.build?.outDir ?? "dist");

        serverEntry = getServerEntryScript(config);

        // Allow base to be set via env:
        base = config.base ?? process.env.BASE_URL ?? "/";

        if (spa) spa = urlToFileName(spa, createIndexFiles, base);

        if (mode === "server") {
          // Read the index.html so we can use it as template for all prerendered pages.
          const indexHtml = path.join(outDir, "index.html");
          template = fsutils.read(indexHtml);
          fsutils.rm(indexHtml);

          manifest = readManifest(outDir);

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
          // Client build ...
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
        if (source === "virtual:capri-render") {
          return serverEntry;
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
          return fsutils.read(index);
        }
        if (id === "\0virtual:capri-hydration") {
          const file = resolveRelative("./virtual/hydration.js");
          return fsutils
            .read(file)
            .replace(/%ISLAND_GLOB_PATTERN%/g, islandGlobPattern);
        }
        if (id === ssr) {
          return fsutils
            .read(ssr)
            .replace(/"%TEMPLATE%"/, JSON.stringify(template))
            .replace("{/*MANIFEST*/}", JSON.stringify(manifest));
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
          const ssrBundle = path.resolve(outDir, "ssr.js");

          // Prerender pages...
          const prerendered = await renderStaticPages({
            ssrBundle,
            createIndexFiles,
            outDir,
            base,
            prerender,
            followLinks,
          });
          if (target) {
            await target.build({
              rootDir,
              outDir,
              ssrBundle,
              prerendered,
              fsutils,
              bundle: createBundler(ssrBundle),
            });
          }
          fsutils.rm(ssrBundle);
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
  ];
}

function resolveRelative(src: string) {
  return new URL(src, import.meta.url).pathname;
}

function getEntryScript(config: UserConfig) {
  const indexHtml = path.resolve(config.root ?? "", "index.html");
  const src = getEntrySrc(fsutils.read(indexHtml));
  if (!src) throw new Error(`Can't find entry script in ${indexHtml}`);
  return path.join(path.resolve(config.root ?? ""), src);
}

function getServerEntryScript(config: UserConfig) {
  const clientEntryScript = getEntryScript(config);
  const f = clientEntryScript.replace(
    /(\.client|\.server)?(\.[^.]+)$/,
    ".server$2"
  );
  if (!fsutils.exists(f)) {
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
    if (fsutils.exists(f)) {
      const json = fsutils.read(f);
      fsutils.rm(f);
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
