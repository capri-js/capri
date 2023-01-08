import type { OutputAsset, OutputBundle, OutputChunk } from "rollup";
import type { Plugin } from "vite";

export function serverAssetsPlugins(): Plugin[] {
  let ssrBuild = false;
  let base: string;

  const serverAssets: OutputBundle = {};

  return [
    /**
     * Vite does not emit assets for SSR builds, assuming that they are emitted
     * by the client build. For Capri, this is only the case if we are building
     * the preview SPA, which is optional. Normally, the client build will only
     * include the islands and the hydration code. We therefore add this plugin
     * to save the server assets so that we can restore them later on (see next
     * plugin).
     */
    {
      enforce: "pre",
      name: "capri-save-assets",
      config(cfg) {
        ssrBuild = !!cfg.build?.ssr;
        base = cfg.base ?? process.env.BASE_URL ?? "/";
      },
      generateBundle(options, bundle) {
        if (ssrBuild) {
          for (const file in bundle) {
            const chunk = bundle[file];
            if (chunk.type === "asset" && !file.includes("ssr-manifest.json")) {
              serverAssets[file] = chunk;
            }
          }
        }
      },
    },

    /**
     * This plugin restores the assets that were saved by the previous one and
     * were meanwhile deleted by Vite's asset plugin:
     * https://github.com/vitejs/vite/blob/f12a1ab/packages/vite/src/node/plugins/asset.ts#L189
     */
    {
      enforce: "post",
      name: "capri-restore-assets",
      generateBundle(options, bundle) {
        if (ssrBuild) {
          // Add the assets back to the bundle so that Vite will emit the files
          Object.assign(bundle, serverAssets);

          const css = getCssUrls(serverAssets, base);
          const ssrChunk = getSSRChunk(bundle);

          // We have to rewrite the code here, after the bundling has finished.
          // If the chunk had a source map, this would mess it up and we would
          // need to use a library like magic-string.
          // For now this naive approach seems fine.
          ssrChunk.code = ssrChunk.code.replace(
            "__CSS_ASSETS__",
            JSON.stringify(css)
          );
        }
      },
    },
  ];
}

function getSSRChunk(bundle: OutputBundle) {
  const chunk = Object.values(bundle)
    .filter(isOutputChunk)
    .find((c) => c.name === "ssr");

  if (!chunk) throw new Error("Can't find SSR chunk.");
  return chunk;
}

function isOutputChunk(chunk: OutputAsset | OutputChunk): chunk is OutputChunk {
  return chunk.type === "chunk";
}

function getCssUrls(serverAssets: OutputBundle, base = "/") {
  return Object.keys(serverAssets)
    .filter((f) => f.endsWith(".css"))
    .map((f) => `${base}${f}`);
}
