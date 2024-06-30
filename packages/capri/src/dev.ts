import fs from "fs";
import path from "path";
import { ModuleGraph, ModuleNode, ViteDevServer } from "vite";

import { getEntryScripts } from "./entry.js";
import { renderHtml } from "./render.js";
import { direct } from "./utils.js";

export async function renderPreview(server: ViteDevServer, url: string) {
  // always read fresh template in dev
  const indexHtml = fs.readFileSync(
    path.resolve(server.config.root, "index.html"),
    "utf-8"
  );

  const entry = getEntryScripts(server.config.root);

  // Load the server entry. vite.ssrLoadModule automatically transforms
  // your ESM source code to be usable in Node.
  const renderFn = (await server.ssrLoadModule(entry.server)).render;
  const css = collectCss(server.moduleGraph);
  try {
    const html = await renderHtml(renderFn, url, indexHtml, css);
    if (html) {
      // Apply Vite HTML transforms. This injects the Vite HMR client, and
      // also applies HTML transforms from Vite plugins, e.g. global preambles
      // from @vitejs/plugin-react
      return await server.transformIndexHtml(url, html);
    }
  } catch (e: any) {
    server.ssrFixStacktrace(e);
    throw e;
  }
}

function collectCss(moduleGraph: ModuleGraph) {
  const css: string[] = [];
  moduleGraph.idToModuleMap.forEach((m) => {
    if (isStyleModule(m)) {
      const href = direct(m.url);
      if (!css.includes(href)) {
        css.push(href);
      }
    }
  });
  return css;
}

// Taken from https://github.com/vitejs/vite/blob/13ac37d/packages/vite/src/node/constants.ts#L49
export const CSS_LANGS =
  /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/;

function isStyleModule(mod: ModuleNode) {
  return !!(CSS_LANGS.test(mod.url) || mod.id?.match(/\?vue&type=style/));
}
