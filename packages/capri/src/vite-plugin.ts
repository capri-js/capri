import * as fs from "fs";
import { builtinModules } from "module";
import * as path from "path";
import type {
  OutputBundle,
  OutputChunk,
  PluginContext,
  RollupOptions,
} from "rollup";
import type { ChunkMetadata, Plugin, PluginOption, UserConfig } from "vite";

import { findRenderChunk } from "./bundle.js";
import { getEntrySrc } from "./html.js";
import {
  FollowLinksConfig,
  PrerenderConfig,
  renderStaticPages,
  urlToFileName,
} from "./prerender.js";
import { importServerChunk } from "./ssr.js";

export interface CapriPluginOptions {
  spa?: string | false;
  createIndexFiles?: boolean;
  ssrFormat?: "commonjs" | "esm";
  prerender?: PrerenderConfig;
  followLinks?: FollowLinksConfig;
  islandGlobPattern?: string;
  hydrate: string;
}

export type CapriAdapterPluginOptions = Omit<CapriPluginOptions, "hydrate">;

export type HydrationAdapter = {
  hydrate: (component: any, props: object, element: Element) => void;
  renderChildren: (html: string) => any;
};

export function capri({
  createIndexFiles = true,
  prerender = "/",
  followLinks = true,
  islandGlobPattern = "/src/**/*.island.*",
  ssrFormat = "esm",
  hydrate,
  spa,
}: CapriPluginOptions): Plugin[] {
  let mode: "client" | "server" | "spa";
  let ssr: string;
  if (spa) spa = urlToFileName(spa, createIndexFiles);

  function loadVirtualModule(name: string) {
    const file = new URL(`./virtual/${name}.js`, import.meta.url).pathname;
    return fs
      .readFileSync(file, "utf8")
      .replace(/%ISLAND_GLOB_PATTERN%/g, islandGlobPattern);
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

        if (mode === "server") {
          ssr = getServerEntryScript(config);
          return {
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
          let rollupOptions: RollupOptions | undefined;
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
            build: {
              ssrManifest: true,
              rollupOptions,
            },
          };
        }
      },
      async resolveId(source) {
        if (source === spa) {
          return resolveFile(this, spa);
        }
        if (source === "virtual:capri-hydration") {
          return "\0virtual:capri-hydration";
        }
        if (source === "virtual:capri-islands") {
          return "\0virtual:capri-islands";
        }
        if (source === "virtual:capri-hydration-adapter") {
          return this.resolve(hydrate);
        }
      },
      async load(id) {
        if (spa && id.endsWith(spa)) {
          const index = await resolveIndexHtml(this);
          return fs.readFileSync(index, "utf8");
        }
        if (id === "\0virtual:capri-hydration") {
          return loadVirtualModule("hydration");
        }
        if (id === "\0virtual:capri-islands") {
          return loadVirtualModule("islands");
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
        if (mode === "server") {
          const chunk = findRenderChunk(bundle, ssr);

          // Remove the ssr chunk from the bundle as we don't want it to be written to disk.
          delete bundle[chunk.fileName];

          // Read the index.html so we can use it as template for all prerendered pages.
          const indexHtml = fs.readFileSync(
            path.join(options.dir!, "index.html"),
            "utf8"
          );

          // Import the render function from the SSR bundle.
          const { render } = await importServerChunk(chunk, options.dir!);

          // Prerender pages...
          await renderStaticPages(render, {
            template: indexHtml,
            outDir: options.dir!,
            createIndexFiles,
            prerender,
            followLinks,
          });
        }
      },
    },
  ];
}

export function hasPlugin(plugins: PluginOption, name: string): boolean {
  if (Array.isArray(plugins)) {
    return plugins.some((p) => hasPlugin(p, name));
  } else if (plugins && plugins.name) {
    return plugins.name === name;
  }
  return false;
}

function getEntryScript(config: UserConfig) {
  const f = path.resolve(config.root ?? "", "index.html");
  const src = getEntrySrc(fs.readFileSync(f, "utf8"));
  if (!src) throw new Error(`Can't find entry script in ${f}`);
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
