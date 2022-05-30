import { ChunkMetadata } from "vite";

// Vite extends rollup's RenderedChunk interface but does not export its
// declaration so we have to repeat it here:

declare module "rollup" {
  export interface RenderedChunk {
    viteMetadata: ChunkMetadata;
  }
}
