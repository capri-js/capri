import * as fs from "fs";
import path, { join } from "path";
import type { UserConfig, PluginOption } from "vite";
import type { OutputChunk, PluginContext } from "rollup";
import { GetStaticPaths, RenderFunction, ServerEntry } from "./types";

export function stripModulePreloadLinks(html: string) {
  return html.replace(/<link rel="modulepreload" href=".+?">\s*/g, "");
}

function stripSlashes(s: string) {
  return s.replace(/^\/|\/$/g, "");
}

export function urlToFileName(url: string, extraDir: boolean) {
  const file = stripSlashes(url);
  if (!file) return "index.html";
  return `${file}${extraDir ? "/index.html" : ".html"}`;
}

export function hasPlugin(plugins: PluginOption, name: string): boolean {
  if (Array.isArray(plugins)) {
    return plugins.some((p) => hasPlugin(p, name));
  } else if (plugins && plugins.name) {
    return plugins.name === name;
  }
  return false;
}

function getEntryScript(ctx: PluginContext) {
  const indexId = [...ctx.getModuleIds()].find((id) =>
    id.endsWith("index.html")
  );
  if (!indexId) throw new Error("Can't find index.html in module list.");
  const [entry] = ctx
    .getModuleInfo(indexId)!
    .importedIds.filter((id) => /^\/.*\.([tj]sx?)$/.test(id));

  if (!entry) throw new Error("Can't find entry script in index module.");
  return entry;
}

async function importChunk(chunk: any, dir: string) {
  const f = join(dir, chunk.fileName);
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

function assertGetStaticPaths(
  fn: unknown,
  file: string
): asserts fn is GetStaticPaths | undefined {
  if (typeof fn === "undefined") return;
  if (typeof fn !== "function") {
    throw new Error(`Expected getStaticPaths in ${file} to be a function.`);
  }
  if (fn.length > 0) {
    throw new Error(
      `Expected getStaticPaths in ${file} to have no arguments but got ${fn.length}`
    );
  }
}

export async function importServerEntry(
  chunk: OutputChunk,
  dir: string
): Promise<ServerEntry> {
  const { render, getStaticPaths } = await importChunk(chunk, dir);
  assertRenderFunction(render, chunk.fileName);
  assertGetStaticPaths(getStaticPaths, chunk.fileName);
  return { render, getStaticPaths };
}

export function emitBuildInfo(ctx: PluginContext) {
  const clientEntryScript = getEntryScript(ctx);
  ctx.emitFile({
    type: "asset",
    fileName: ".buildinfo.json",
    source: JSON.stringify({ clientEntryScript }),
  });
}

function getOutDir(config: UserConfig) {
  return path.resolve(config.root ?? "", config.build?.outDir ?? "dist");
}

function loadBuildInfo(dir: string) {
  const f = join(dir, ".buildinfo.json");
  if (!fs.existsSync(f)) {
    throw new Error(
      `No .buildinfo.json file found in ${dir}. Make sure to perform a client build before.`
    );
  }
  return JSON.parse(fs.readFileSync(f, "utf8"));
}

export function getServerEntryScript(config: UserConfig) {
  const { clientEntryScript } = loadBuildInfo(getOutDir(config));
  const f = clientEntryScript.replace(/(\.client)?(\.[^.]+)$/, ".server$2");
  if (!fs.existsSync(f)) {
    throw new Error(
      `File not found: ${f}. Make sure to name your server entry file accordingly.`
    );
  }
  return f;
}
