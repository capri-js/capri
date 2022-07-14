import { createTemplate } from "./template/createTemplate.js";
import { IslandMarker } from "./template/Template.js";
import { RenderContext, RenderFunction, RenderResult } from "./types.js";

const staticContext: RenderContext = {
  headers: [],
  setHeader: () => {
    // ignore
  },
};

export async function renderHtml(
  render: RenderFunction,
  url: string,
  indexHtml: string,
  manifest: Record<string, string[]>,
  context = staticContext
) {
  const result = await render(url, context);
  const template = await createTemplate(indexHtml);

  // Insert the rendered markup into the index.html template:
  template.insertMarkup(await resolveMarkup(result));

  const islands = template.getIslands();
  const preloadTags = getPreloadTags(islands, manifest);

  if (preloadTags.length) {
    // Insert modulepreload links for the included islands:
    template.insertMarkup({ head: preloadTags.join("") });
  } else if (!islands.length) {
    // No islands present, remove the hydration script.
    console.log("No islands found, removing hydration code");
    template.removeScripts({
      src: /hydrate|-legacy/,
      text: /__vite_is_dynamic_import_support|"noModule"|_\$HY/,
    });
  }
  return template.toString();
}

async function resolveMarkup(result: RenderResult) {
  const markup: Record<string, string> = {};
  for (const [key, value] of Object.entries(result)) {
    markup[key] = await value;
  }
  return markup;
}

function getPreloadTags(
  markers: IslandMarker[],
  manifest: Record<string, string[]>
) {
  const preload = new Set<string>();
  markers.forEach((marker) => {
    const { island, json } = marker;
    const chunks = manifest[island];
    const { options } = JSON.parse(json);
    if (!options?.media) {
      chunks?.forEach((asset) => {
        if (asset.endsWith(".js")) preload.add(asset);
      });
    }
  });
  return [...preload].map((src) => `<link rel="modulepreload" href="${src}">`);
}
