import { createWriteStream, readFileSync } from "fs";
import { SitemapItemLoose, SitemapStream } from "sitemap";

import { md5Hash } from "./hash.js";
import { Output } from "./output.js";

type Manifest = Array<{
  url: string;
  hash: string;
  date: string;
}>;

async function readManifest(url: URL): Promise<Manifest> {
  const response = await fetch(url);
  if (!response.ok) {
    console.warn("%s: Failed to fetch manifest from %s", response.status, url);
    return [];
  }
  const json = await response.json();
  return json;
}

type Page = {
  url: string;
  html: string;
  lastmod: string;
};

export type SitemapOptions = {
  origin: string;
  path?: string;
  createItem?: (page: Page) => SitemapItemLoose | null;
};

export async function generateSitemap(
  urls: string[],
  output: Output,
  {
    origin,
    createItem = ({ url, lastmod }) => ({ url, lastmod }),
    path = "/sitemap.xml",
  }: SitemapOptions,
) {
  const manifestPath = path.replace(".xml", "-manifest.json");
  const manifestUrl = new URL(output.addBase(manifestPath), origin);
  const manifest = await readManifest(manifestUrl);

  const newManifest: Manifest = [];
  const now = new Date().toISOString();

  const stream = new SitemapStream({ hostname: origin });
  stream.pipe(createWriteStream(output.resolve(path)));

  for (const url of urls) {
    const file = output.resolve(url);
    const html = readFileSync(file, "utf-8");
    const hash = md5Hash(html);

    const item = manifest.find((item) => item.url === url);
    const lastmod = item?.hash === hash ? item.date : now;

    const newItem = createItem({ url, lastmod, html });
    if (newItem) {
      stream.write(newItem);
      newManifest.push({ url, hash, date: lastmod });
    }
  }
  stream.end();
  output.writeJson(manifestPath, newManifest);
}
