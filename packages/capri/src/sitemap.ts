import { createWriteStream } from "fs";
import { SitemapStream } from "sitemap";

import { Output } from "./output.js";
import { RenderedPage } from "./prerender.js";

async function readManifest(url: URL): Promise<RenderedPage[]> {
  const response = await fetch(url);
  if (!response.ok) {
    console.warn("%s: Failed to fetch manifest from %s", response.status, url);
    return [];
  }
  const json = await response.json();
  return json;
}

export type SitemapOptions = {
  origin: string | URL;
  path?: string;
};

export async function generateSitemap(
  pages: RenderedPage[],
  output: Output,
  { origin, path = "/sitemap.xml" }: SitemapOptions,
) {
  const manifestPath = path.replace(".xml", "-manifest.json");
  const manifestUrl = new URL(output.addBase(manifestPath), origin);
  const manifest = await readManifest(manifestUrl);
  const newManifest: RenderedPage[] = [];
  const now = new Date().toISOString();
  const stream = new SitemapStream();
  stream.pipe(createWriteStream(output.resolve(path)));
  for (const { url, hash } of pages) {
    const item = manifest.find((item) => item.url === url);
    const date = item?.hash === hash ? item.date : now;
    const fullUrl = new URL(output.addBase(url), origin);
    stream.write({ url: fullUrl, lastmod: date });
    newManifest.push({ url, hash, date });
  }
  stream.end();
  output.writeJson(manifestPath, newManifest);
}
