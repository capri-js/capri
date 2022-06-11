import type { RenderFunction, ServerEntry } from "capri";
import * as fs from "fs";
import * as path from "path";
import type { OutputChunk } from "rollup";

export async function importServerChunk(
  chunk: OutputChunk,
  dir: string
): Promise<ServerEntry> {
  const { render } = await importChunk(chunk, dir);
  assertRenderFunction(render, chunk.fileName);
  return { render };
}

async function importChunk(chunk: any, dir: string) {
  const f = path.join(dir, chunk.fileName);
  await fs.promises.writeFile(f, chunk.code);
  try {
    return await import(f);
  } finally {
    await fs.promises.unlink(f);
  }
}

function assertRenderFunction(
  fn: unknown,
  file: string
): asserts fn is RenderFunction {
  if (!fn || typeof fn !== "function") {
    throw new Error(`${file} must export a render function.`);
  }
  if (fn.length !== 1) {
    throw new Error(
      `Expected render function ${file} to have exactly 1 argument but got ${fn.length}`
    );
  }
}
