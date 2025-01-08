import type { OutputAsset, OutputBundle, OutputChunk } from "rollup";

export function getEntryFile(bundle: OutputBundle) {
  for (const file in bundle) {
    const chunk = bundle[file];
    if (isOutputChunk(chunk) && chunk.isEntry) {
      return file;
    }
  }
  throw new Error("Can't find entry file.");
}

function isOutputChunk(chunk: OutputAsset | OutputChunk): chunk is OutputChunk {
  return chunk.type === "chunk";
}

export function getCssLinks(bundle: OutputBundle, base = "/") {
  if (!base.endsWith("/")) {
    base += "/";
  }
  return Object.values(bundle)
    .filter((c) => c.fileName.endsWith(".css"))
    .map((c) => `${base}${c.fileName}`);
}
