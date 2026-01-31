import { text } from "node:stream/consumers";

import fs from "fs";
import path from "path";

import { getHeadAndBodyInnerHtml } from "./html.js";
import { Template } from "./Template.js";
import {
  isStreamResult,
  RenderedHtml,
  RenderFunction,
  StreamResult,
} from "./types.js";

async function loadCssContent(href: string, outDir: string): Promise<string> {
  const filePath = path.join(outDir, href);
  return fs.readFileSync(filePath, "utf-8");
}

export async function loadRenderFunction(path: string) {
  if (path.startsWith(".")) {
    throw new Error("Path must be absolute");
  }
  const mod = await import(/* @vite-ignore */ path);
  if (mod && typeof mod === "object" && "render" in mod) {
    const fn = mod.render;
    if (typeof fn === "function") return fn as RenderFunction;
  }
  throw new Error(`${path} does not export a render function`);
}

/**
 * Renders a page and returns a template which can be used to insert additional
 * markup.
 *
 * @param renderFn The render function
 * @param url The URL of the page to render
 * @param indexHtml The index.html where to insert the markup
 * @param css List of stylesheets to include
 * @param context The context passed to the render function
 * @returns A HTML string or undefined, if nothing was rendered.
 */
export async function renderHtml(
  renderFn: RenderFunction,
  url: string,
  indexHtml: string,
  css: string[],
  inlineCss = false,
  outDir?: string,
) {
  const result = await renderFn(url);
  if (!result) return;

  const template = new Template(indexHtml);

  // Insert the rendered markup into the index.html template:
  template.insertMarkup(await resolveMarkup(result));

  if (inlineCss && outDir) {
    // Fetch and inline CSS content
    const cssContents = await Promise.all(
      css.map((href) => loadCssContent(href, outDir)),
    );
    const inlinedStyles = cssContents
      .filter((content) => content.length > 0)
      .map((content) => `<style>${content}</style>`)
      .join("");
    template.insertMarkup({ head: inlinedStyles });
  } else {
    const head = css
      .map((href) => `<link rel="stylesheet" href="${href}">`)
      .join("");
    template.insertMarkup({ head });
  }

  const islands = template.getIslands();
  if (!islands.length) {
    // No islands present, remove the hydration script.
    console.info(url, "No islands present, removing the hydration script.");
    template.removeScripts({
      src: /index-|-legacy|modulepreload-polyfill/,
      text: /__vite_is_modern_browser|"noModule"|_\$HY/,
    });
  }
  return template.toString();
}

/**
 * The Markup object returned by a RenderFunction may have Promises as values.
 * This utility function awaits them and returns an object with the resolved
 * values.
 */
async function resolveMarkup(
  markup: RenderedHtml | Record<string, RenderedHtml>,
) {
  if (typeof markup === "string" || isStreamResult(markup)) {
    const html = await stringOrStreamResult(await markup);
    return getHeadAndBodyInnerHtml(html);
  }
  const resolved: Record<string, string> = {};
  for (const [key, value] of Object.entries(markup)) {
    resolved[key] = await stringOrStreamResult(await value);
  }
  return resolved;
}

/**
 * Support for React's PrerenderToNodeStreamResult.
 */
async function stringOrStreamResult(value: string | StreamResult) {
  if (typeof value === "string") return value;
  if (isStreamResult(value)) {
    return text(value.prelude);
  }
  throw new Error("Invalid render result");
}
