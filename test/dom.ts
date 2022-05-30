import legacy from "@vitejs/plugin-legacy";
import { JSDOM } from "jsdom";
import * as path from "path";
import { build } from "vite";

export async function getExampleDOM(root: string) {
  const base = path.join(root, "dist") + "/";
  await build({ root, base, plugins: [legacy()] });
  await build({ root, base, build: { ssr: true } });
  const dom = await JSDOM.fromFile(path.join(root, "dist", "index.html"), {
    url: `file://${root}/dist/index.html`,
    runScripts: "dangerously",
    resources: "usable",
  });
  return dom;
}
