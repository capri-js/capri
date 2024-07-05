import { Template } from "./Template.js";
import { Markup, RenderFunction } from "./types.js";
import { SSRFunction } from "./virtual/ssr.js";

export async function loadSSRModule(path: string) {
  if (path.startsWith(".")) {
    throw new Error("Path must be absolute");
  }

  const mod = await import(/* @vite-ignore */ path);

  if (mod && typeof mod === "object" && "default" in mod) {
    const ssr = mod.default;
    // When the ssr bundle is commonJs, we end up with default.default:
    const fn = ssr.default ?? ssr;
    if (typeof fn === "function") return fn as SSRFunction;
  }
  throw new Error(`${path} is not a SSR module`);
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
) {
  const result = await renderFn(url);
  if (!result) return;

  const template = new Template(indexHtml);

  // Insert the rendered markup into the index.html template:
  template.insertMarkup(await resolveMarkup(result));

  const head = css
    .map((href) => `<link rel="stylesheet" href="${href}">`)
    .join("");
  template.insertMarkup({ head });

  const islands = template.getIslands();
  if (!islands.length) {
    // No islands present, remove the hydration script.
    console.log("No islands found, removing hydration code");
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
async function resolveMarkup(markup: Markup) {
  const resolved: Record<string, string> = {};
  for (const [key, value] of Object.entries(markup)) {
    resolved[key] = await value;
  }
  return resolved;
}
