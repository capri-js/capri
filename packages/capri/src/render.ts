import {
  getIslands,
  insertMarkup,
  insertPreloadTags,
  IslandChunk,
  removeHydrationCode,
} from "./html.js";
import { RenderFunction } from "./types.js";

export async function renderHtml(
  render: RenderFunction,
  url: string,
  template: string,
  manifest: Record<string, string[]>
) {
  const markup = await render(url);

  // Insert the rendered markup into the index.html template:
  let html = await insertMarkup(template, markup);

  const { preload, hasIslands } = analyzeHtml(html, manifest);
  if (preload.length) {
    // Insert modulepreload links for the included islands:
    html = insertPreloadTags(html, preload);
  } else if (!hasIslands) {
    // No islands present, remove the hydration script.
    html = removeHydrationCode(html);
  }
  return html;
}

function analyzeHtml(html: string, manifest: Record<string, string[]>) {
  const islands = getIslands(html);
  const preload = new Set<IslandChunk>();
  islands.forEach((island) => {
    const { src, options } = island;
    const chunks = manifest[src];
    if (!options?.media) {
      chunks?.forEach((asset) => {
        if (asset.endsWith(".js")) preload.add({ src, asset });
      });
    }
  });
  return {
    preload: [...preload],
    hasIslands: !!islands.length,
  };
}
