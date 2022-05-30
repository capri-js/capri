import { OutputAsset, OutputBundle, OutputChunk } from "rollup";

export function findRenderChunk(bundle: OutputBundle, src: string) {
  const chunk = findChunk(bundle, src);
  if (isOutputChunk(chunk)) {
    if (chunk.exports.includes("render")) {
      return chunk;
    }
  }
  throw new Error(`${src} must export a render function`);
}

function findChunk(bundle: OutputBundle, src: string) {
  const chunk = Object.values(bundle).find(
    (asset) => asset.type === "chunk" && asset.facadeModuleId?.endsWith(src)
  );
  if (!chunk) throw new Error(`Can't find chunk matching ${src}`);
  return chunk;
}

function isOutputChunk(chunk: OutputAsset | OutputChunk): chunk is OutputChunk {
  return (
    !!chunk &&
    typeof chunk === "object" &&
    "code" in chunk &&
    typeof chunk.code === "string"
  );
}
