import urlJoin from "url-join";

import { getLinks } from "./html.js";
import { Output } from "./output.js";
import { loadRenderFunction, renderHtml } from "./render.js";

export type PrerenderConfig =
  | false
  | string
  | string[]
  | (() => string[] | Promise<string[]>);

export type FollowLinksConfig = boolean | ((pathname: string) => boolean);

async function getStaticPaths(prerender: PrerenderConfig): Promise<string[]> {
  if (prerender === false) return [];
  if (typeof prerender === "string") return [prerender];
  if (Array.isArray(prerender)) return prerender;
  return getStaticPaths(await prerender());
}

type StaticRenderConfig = {
  ssrBundle: string;
  template: string;
  cssLinks: string[];
  output: Output;
  prerender: PrerenderConfig;
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

  const seen = new Set(
    (await getStaticPaths(prerender)).map((s) => urlJoin(output.base, s)),
  );
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
