import * as fs from "fs";
import * as path from "path";

import {
  getIslands,
  getLinks,
  insertMarkup,
  insertPreloadTags,
  IslandChunk,
  removeHydrationCode,
  RenderResult,
} from "./html.js";

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
  prerender: PrerenderConfig;
  followLinks: FollowLinksConfig;
};

async function getStaticPaths(prerender: PrerenderConfig): Promise<string[]> {
  if (prerender === false) return [];
  if (typeof prerender === "string") return [prerender];
  if (Array.isArray(prerender)) return prerender;
  return getStaticPaths(await prerender());
}

export type RenderFunction = (
  url: string
) => RenderResult | Promise<RenderResult>;

export async function renderStaticPages(
  render: RenderFunction,
  {
    template,
    createIndexFiles,
    outDir,
    prerender,
    followLinks,
  }: StaticRenderConfig
) {
  const manifest = readManifest(outDir);
  const seen = new Set(await getStaticPaths(prerender));
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

    const fileName = urlToFileName(url, createIndexFiles);
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

export function urlToFileName(url: string, extraDir: boolean) {
  const file = stripSlashes(url);
  if (!file) return "index.html";
  if (file.includes(".html")) return file;
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
