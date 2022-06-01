import { getEntrySrc, prerender } from "capri";
import * as fs from "fs";
import { readFile } from "fs/promises";
import * as path from "path";
import type {
  OutputBundle,
  OutputChunk,
  PluginContext,
  RollupOptions,
} from "rollup";
import type { ChunkMetadata, Plugin, PluginOption, UserConfig } from "vite";
import island from "vite-plugin-island";

import { findRenderChunk } from "./bundle.js";
import { importServerChunk } from "./ssr.js";
import { CapriPluginOptions } from "./types.js";
export * from "./types.js";

export default function capri({
  islandGlobPattern = "/src/**/*.island.*",
  createIndexFiles = true,
  hydrate,
  renderMarkerFragment,
  spa,
}: CapriPluginOptions): Plugin[] {
  let mode: "client" | "server" | "spa";
  let ssr: string;
  return [
    island({
      islandGlobPattern,
      hydrate,
      renderMarkerFragment,
    }),
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
            build: {
              ssr,
              emptyOutDir: false, // keep the client build
              rollupOptions: {
                output: {
                  // Generate the Node.js code as ES module.
                  // Using ESM everywhere is a lot easier than mixing module types.
                  format: "es",
                },
              },
            },
          };
        } else {
          let rollupOptions: RollupOptions | undefined;
          if (spa) {
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
      },
      async load(id) {
        if (spa && id.endsWith(spa)) {
          const index = await resolveIndexHtml(this);
          return fs.readFileSync(index, "utf8");
        }
      },
      async buildStart() {
        if (mode === "client") {
          // Add the hydration code to the bundle
          this.emitFile({
            id: "virtual:island-hydration",
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
          const indexHtml = await readFile(
            path.join(options.dir!, "index.html"),
            "utf8"
          );

          // Import the render function from the SSR bundle.
          const { render, getStaticPaths } = await importServerChunk(
            chunk,
            options.dir!
          );

          // Prerender pages...
          const staticPaths: string[] = getStaticPaths
            ? await getStaticPaths()
            : ["/"];

          await prerender(staticPaths, render, {
            template: indexHtml,
            outDir: options.dir!,
            createIndexFiles,
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
  const f = clientEntryScript.replace(/(\.client)?(\.[^.]+)$/, ".server$2");
  if (!fs.existsSync(f)) {
    throw new Error(
      `File not found: ${f}. Make sure to name your server entry file accordingly.`
    );
  }
  return f;
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
