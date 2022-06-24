import * as fs from "fs";
import * as path from "path";
import urlJoin from "url-join";

import {
  getIslands,
  getLinks,
  insertMarkup,
  insertPreloadTags,
  IslandChunk,
  removeHydrationCode,
} from "./html.js";
import { RenderFunction } from "./types.js";

export type PrerenderConfig =
  | false
  | string
  | string[]
  | (() => string[] | Promise<string[]>);

export type FollowLinksConfig = boolean | ((pathname: string) => boolean);

type StaticRenderConfig = {
  template: string;
  createIndexFiles: boolean;
  outDir: string;
  base: string;
  prerender: PrerenderConfig;
  followLinks: FollowLinksConfig;
};

async function getStaticPaths(prerender: PrerenderConfig): Promise<string[]> {
  if (prerender === false) return [];
  if (typeof prerender === "string") return [prerender];
  if (Array.isArray(prerender)) return prerender;
  return getStaticPaths(await prerender());
}

export async function renderStaticPages(
  render: RenderFunction,
  {
    template,
    createIndexFiles,
    outDir,
    base,
    prerender,
    followLinks,
  }: StaticRenderConfig
) {
  const manifest = readManifest(outDir);
  const seen = new Set(
    (await getStaticPaths(prerender)).map((s) => urlJoin(base, s))
  );
  const urls = [...seen];
  for (const url of urls) {
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

    const fileName = urlToFileName(url, createIndexFiles, base);
    const dest = path.join(outDir, fileName);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, html);

    if (followLinks) {
      const follow = typeof followLinks === "function" ? followLinks : Boolean;
      const links = getLinks(html).filter(follow);
      for (const link of links) {
        if (!seen.has(link)) {
          seen.add(link);
          urls.push(link);
        }
      }
    }
  }
}

export function urlToFileName(url: string, extraDir: boolean, base: string) {
  let file = stripTrailingSlash(url);
  base = stripTrailingSlash(base);
  if (base && file.startsWith(base)) file = file.slice(base.length);
  file = stripLeadingSlash(file);
  if (!file) return "index.html";
  if (file.includes(".html")) return file;
  return `${file}${extraDir ? "/index.html" : ".html"}`;
}

function stripLeadingSlash(s: string) {
  return s.replace(/^\//, "");
}

function stripTrailingSlash(s: string) {
  return s.replace(/\/$/, "");
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
