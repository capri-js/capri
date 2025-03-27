import urlJoin from "url-join";

import { getLinks } from "./html.js";
import { Output } from "./output.js";
import { loadRenderFunction, renderHtml } from "./render.js";
import { GetStaticPathsFunction, PrerenderConfig } from "./types.js";

export type FollowLinksConfig = boolean | ((pathname: string) => boolean);

export async function loadGetStaticPaths(
  path: string,
): Promise<GetStaticPathsFunction | null> {
  if (path.startsWith(".")) {
    throw new Error("Path must be absolute");
  }
  const mod = await import(/* @vite-ignore */ path);
  if (mod && typeof mod === "object" && "getStaticPaths" in mod) {
    const fn = mod.getStaticPaths;
    if (typeof fn === "function") return fn as GetStaticPathsFunction;
  }
  return null;
}

async function resolveStaticPaths(
  prerender: PrerenderConfig,
): Promise<string[]> {
  if (prerender === false) return [];
  if (typeof prerender === "string") return [prerender];
  if (Array.isArray(prerender)) return prerender;
  return resolveStaticPaths(await prerender());
}

type StaticRenderConfig = {
  ssrBundle: string;
  template: string;
  cssLinks: string[];
  output: Output;
  prerender?: PrerenderConfig;
  followLinks: FollowLinksConfig;
  inlineCss?: boolean;
};

export async function renderStaticPages({
  ssrBundle,
  template,
  cssLinks,
  output,
  prerender,
  followLinks,
  inlineCss = false,
}: StaticRenderConfig) {
  const renderFn = await loadRenderFunction(ssrBundle);

  // If no prerender config is provided or it's undefined, try to load getStaticPaths
  // Set default to "/" if neither is available
  let resolvedPaths: string[];
  if (prerender === undefined) {
    const getStaticPathsFn = await loadGetStaticPaths(ssrBundle);
    if (getStaticPathsFn) {
      const paths = await getStaticPathsFn();
      resolvedPaths = await resolveStaticPaths(paths);
    } else {
      resolvedPaths = ["/"];
    }
  } else {
    resolvedPaths = await resolveStaticPaths(prerender);
  }

  const seen = new Set(resolvedPaths.map((s) => urlJoin(output.base, s)));
  const urls = [...seen];

  for (const url of urls) {
    const html = await renderHtml(
      renderFn,
      url,
      template,
      cssLinks,
      inlineCss,
      output.dir,
    );
    if (html) {
      output.write(url, html);
      if (followLinks) {
        const follow =
          typeof followLinks === "function" ? followLinks : Boolean;
        const links = getLinks(html).filter(follow);
        for (const link of links) {
          if (!seen.has(link)) {
            seen.add(link);
            urls.push(link);
          }
        }
      }
    } else {
      console.warn("Skipping", url);
    }
  }
  return urls;
}
