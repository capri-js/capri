import * as cheerio from "cheerio";

import { isLocalUrl, resolveUrl } from "./utils.js";

export function getLinks(html: string) {
  const $ = cheerio.load(html);
  return $('a[href]:not([target]),a[href][target="self"]')
    .map((i, el) => $(el).attr("href"))
    .toArray()
    .filter(isLocalUrl)
    .map(resolveUrl)
    .map(decodeURI);
}

export function getEntrySrc(html: string) {
  const $ = cheerio.load(html);
  const src = $('script[type="module"][src]')
    .map((i, el) => $(el).attr("src"))
    .toArray()
    .filter(isLocalUrl);
  return src[0];
}

export function getHeadAndBodyInnerHtml(html: string) {
  const $ = cheerio.load(html);
  return {
    head: $.html("head"),
    body: $.html("body"),
  };
}
