import * as cheerio from "cheerio";

export type IslandChunk = {
  src: string;
  asset: string;
};

function isLocalUrl(href: string) {
  const url = new URL(href, "file:///");
  return url.protocol === "file:" && !url.host;
}

function resolveUrl(href: string) {
  const url = new URL(href, "file:///");
  return url.pathname;
}

export function getLinks(html: string) {
  const $ = cheerio.load(html);
  return $('a[href]:not([target]),a[href][target="self"]')
    .map((i, el) => $(el).attr("href"))
    .toArray()
    .filter(isLocalUrl)
    .map(resolveUrl);
}

export function getIslands(html: string) {
  const $ = cheerio.load(html);
  const islands = $('script[type="application/json"][data-island]')
    .map((i, el) => {
      const $el = $(el);
      const data = $el.attr("data-island") ?? "";
      const [src, key] = data.split("::");
      const { props, options } = JSON.parse($el.text());
      return {
        src,
        key,
        props,
        options,
      };
    })
    .toArray();
  const unique = new Set(islands);
  return [...unique];
}

export function getEntrySrc(html: string) {
  const $ = cheerio.load(html);
  const src = $('script[type="module"][src]')
    .map((i, el) => $(el).attr("src"))
    .toArray()
    .filter(isLocalUrl);
  return src[0];
}

export type RenderResult = Record<string, string | Promise<string>>;

export async function insertMarkup(template: string, markup: RenderResult) {
  const $ = cheerio.load(template);
  for (const [selector, html] of Object.entries(markup)) {
    $(selector)
      .first()
      .append($(await html));
  }
  return $.html();
}

export function insertPreloadTags(html: string, preloads: IslandChunk[]) {
  const $ = cheerio.load(html);
  preloads.forEach((href) =>
    $("head").append(`<link rel="modulepreload" href="${href}">`)
  );
  return $.html();
}

export function removeHydrationCode(html: string) {
  const $ = cheerio.load(html);
  $("script").each((i, el) => {
    const $el = $(el);
    const id = $el.attr("id");
    const src = $el.attr("src");
    const text = $el.text();
    if (
      src?.includes("hydrate") ||
      id?.startsWith("vite-legacy-") ||
      text.includes("__vite_is_dynamic_import_support") ||
      text.includes("nomodule")
    ) {
      removeNodeAndWhitespaceSiblings($el, $);
    }
  });
  $('link[rel="modulepreload"]').remove();
  return $.html();
}

function removeNodeAndWhitespaceSiblings(
  $el: cheerio.Cheerio<cheerio.Element>,
  $: cheerio.CheerioAPI
) {
  removeWhitespaceSiblings($el, $);
  removeWhitespaceSiblings($el.prev(), $);
  $el.remove();
}

function removeWhitespaceSiblings(
  $el: cheerio.Cheerio<cheerio.Element>,
  $: cheerio.CheerioAPI
) {
  const el = $el.get(0);
  let next = el?.nextSibling;
  while (next && next.nodeType === 3 && next.data.trim().length === 0) {
    const $t = $(next);
    next = next.nextSibling;
    $t.remove();
  }
}
