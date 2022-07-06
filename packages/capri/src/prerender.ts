import * as fs from "fs";
import * as path from "path";
import urlJoin from "url-join";

import { getLinks } from "./html.js";
import { polyfillWebAPIs } from "./polyfills.js";
import { renderHtml } from "./render.js";

export type PrerenderConfig =
  | false
  | string
  | string[]
  | (() => string[] | Promise<string[]>);

export type FollowLinksConfig = boolean | ((pathname: string) => boolean);

type StaticRenderConfig = {
  template: string;
  manifest: Record<string, string[]>;
  ssrBundle: string;
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

export async function renderStaticPages({
  template,
  manifest,
  ssrBundle,
  createIndexFiles,
  outDir,
  base,
  prerender,
  followLinks,
}: StaticRenderConfig) {
  await polyfillWebAPIs();

  // Import the render function from the SSR bundle.
  const { render } = await import(ssrBundle);

  if (!render || typeof render !== "function") {
    throw new Error("Your server entry file must export a render function.");
  }

  const seen = new Set(
    (await getStaticPaths(prerender)).map((s) => urlJoin(base, s))
  );
  const urls = [...seen];
  for (const url of urls) {
    const html = await renderHtml(render, url, template, manifest);

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
  return urls;
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
