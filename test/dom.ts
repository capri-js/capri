import * as path from "path";
import { JSDOM } from "jsdom";
import { build } from "vite";
import legacy from "@vitejs/plugin-legacy";

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
