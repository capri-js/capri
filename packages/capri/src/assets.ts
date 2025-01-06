import type { OutputAsset, OutputBundle, OutputChunk } from "rollup";
import type { Plugin } from "vite";

export function injectCssLinks(): Plugin {
  let ssrBuild = false;
  let base: string;
  return {
    enforce: "post",
    name: "capri-inject-css-assets",
    config(cfg) {
      ssrBuild = !!cfg.build?.ssr;
      base = cfg.base ?? process.env.BASE_URL ?? "/";
    },
    generateBundle(options, bundle) {
      if (ssrBuild) {
        const css = getCssUrls(bundle, base);
        const ssrChunk = getSSRChunk(bundle);

        // We have to rewrite the code here, after the bundling has finished.
        // Otherwise, if the chunk had a source map, this would mess it up
        // and we would need to use a library like magic-string.
        // For now this naive approach seems fine.
        ssrChunk.code = ssrChunk.code.replace(
          "__CSS_ASSETS__",
          JSON.stringify(css),
        );
      }
    },
  };
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

function getCssUrls(bundle: OutputBundle, base = "/") {
  return Object.keys(bundle)
    .filter((f) => f.endsWith(".css"))
    .map((f) => `${base}${f}`);
}
