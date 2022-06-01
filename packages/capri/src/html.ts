import * as cheerio from "cheerio";

function isLocalUrl(href: string) {
  const url = new URL(href, "file:///");
  return url.protocol === "file:" && !url.host;
}

export function getLinks(html: string) {
  const $ = cheerio.load(html);
  return $('a[href]:not([target]),a[href][target="self"]')
    .map((i, el) => $(el).attr("href"))
    .toArray()
    .filter(isLocalUrl);
}

export function getIslands(html: string) {
  const $ = cheerio.load(html);
  const islands = $('script[type="application/json"][data-island]')
    .map((i, el) => $(el).attr("data-island"))
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

export function insertMarkup(
  template: string,
  markup: Record<string, string> | string
) {
  const $ = cheerio.load(template);
  if (typeof markup === "string")
    markup = {
      "div[id]": markup,
    };
  Object.entries(markup).forEach(([selector, html]) => {
    $(selector).first().html(html.trim());
  });
  return $.html();
}

export function insertPreloadTags(html: string, preloads: string[]) {
  const $ = cheerio.load(html);
  preloads.forEach((src) =>
    $("head").append(`<link rel="modulepreload" src="${src}">`)
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
    console.log("Removing '%s'", next.data);
    next = next.nextSibling;
    $t.remove();
  }
}
