import * as cheerio from "cheerio";

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

export function getEntrySrc(html: string) {
  const $ = cheerio.load(html);
  const src = $('script[type="module"][src]')
    .map((i, el) => $(el).attr("src"))
    .toArray()
    .filter(isLocalUrl);
  return src[0];
}
