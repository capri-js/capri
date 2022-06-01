import * as fs from "fs";
import * as path from "path";

import {
  getIslands,
  getLinks,
  insertMarkup,
  insertPreloadTags,
  removeHydrationCode,
} from "./html.js";
import { RenderFunction } from "./types.js";

type PrerenderOptions = {
  template: string;
  createIndexFiles: boolean;
  outDir: string;
};

export async function prerender(
  staticPaths: string[],
  render: RenderFunction,
  { template, createIndexFiles, outDir }: PrerenderOptions
) {
  const manifest = readManifest(outDir);
  const seen = new Set(staticPaths);
  const urls = [...seen];
  for (const url of urls) {
    const markup = await render(url);

    // Insert the rendered markup into the index.html template:
    let html = insertMarkup(template, markup);

    const preload = getIslandChunks(html, manifest);
    if (preload.length) {
      // Insert modulepreload links for the included islands:
      console.log(
        `Found ${preload.length} islands. Injecting modulepreload links.`
      );
      html = insertPreloadTags(html, preload);
    } else {
      // No islands present, remove the hydration script.
      console.log(`No islands found. Removing hydration code.`);
      //html = removeHydrationCode(html);
    }

    const fileName = urlToFileName(url, createIndexFiles);
    const dest = path.join(outDir, fileName);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, html);

    const links = getLinks(html);
    for (const link of links) {
      if (!seen.has(link)) {
        seen.add(link);
        urls.push(link);
      }
    }
  }
}

function urlToFileName(url: string, extraDir: boolean) {
  const file = stripSlashes(url);
  if (!file) return "index.html";
  return `${file}${extraDir ? "/index.html" : ".html"}`;
}

function stripSlashes(s: string) {
  return s.replace(/^\/|\/$/g, "");
}

function readManifest(dir: string) {
  try {
    const f = path.join(dir, "ssr-manifest.json");
    if (fs.existsSync(f)) {
      const json = fs.readFileSync(f, "utf8");
      const entries = Object.entries(JSON.parse(json))
        .filter(([id]) => !id.startsWith("\0"))
        .map(([id, chunks]) => [path.resolve("/", id), chunks]);

      return Object.fromEntries(entries) as Record<string, string[]>;
    }
  } catch (err) {
    console.error("Failed to load ssr-manifest.json");
    console.error(err);
  }
  return {};
}

function getIslandChunks(html: string, manifest: Record<string, string[]>) {
  const islands = getIslands(html);
  const preload = new Set<string>();
  islands.forEach((src) => {
    const chunks = manifest[src];
    chunks?.forEach((chunk) => preload.add(chunk));
  });
  return [...preload];
}
