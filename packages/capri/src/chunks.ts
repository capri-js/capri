import type { Rollup } from "vite";

export function getEntryFile(bundle: Rollup.OutputBundle) {
  for (const file in bundle) {
    const chunk = bundle[file];
    if (isOutputChunk(chunk) && chunk.isEntry) {
      return file;
    }
  }
  throw new Error("Can't find entry file.");
}

function isOutputChunk(
  chunk: Rollup.OutputAsset | Rollup.OutputChunk,
): chunk is Rollup.OutputChunk {
  return chunk.type === "chunk";
}

export function getCssLinks(bundle: Rollup.OutputBundle, base = "/") {
  if (!base.endsWith("/")) {
    base += "/";
  }
  return Object.values(bundle)
    .filter((c) => c.fileName.endsWith(".css"))
    .map((c) => `${base}${c.fileName}`);
}
