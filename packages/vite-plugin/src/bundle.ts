import { OutputAsset, OutputBundle, OutputChunk } from "rollup";

export function findChunk(bundle: OutputBundle, src: string) {
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

export function findRenderChunk(bundle: OutputBundle, src: string) {
  const chunk = findChunk(bundle, src);
  if (isOutputChunk(chunk)) {
    if (chunk.exports.includes("render")) {
      return chunk;
    }
  }
  throw new Error(`${src} must export a render function`);
}

interface StringOutputAsset extends OutputAsset {
  source: string;
}

function isStringOutputAsset(
  asset: OutputAsset | OutputChunk
): asset is StringOutputAsset {
  return (
    !!asset &&
    typeof asset === "object" &&
    "source" in asset &&
    typeof asset.source === "string"
  );
}

export function getOutputAsset(
  bundle: OutputBundle,
  id: string
): StringOutputAsset {
  const asset = bundle[id];
  if (isStringOutputAsset(asset)) return asset;
  throw new Error(`Can't find OutputAsset: ${id}`);
}
