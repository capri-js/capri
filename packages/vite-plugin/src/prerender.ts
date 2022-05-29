import * as path from "path";
import * as fs from "fs";
import { getLinks } from "./html.js";

type PrerenderOptions = {
  template: string;
  createIndexFiles: boolean;
  appHtmlPlaceholder: string;
  outDir: string;
};

export async function prerender(
  staticPaths: string[],
  render: any,
  { template, createIndexFiles, appHtmlPlaceholder, outDir }: PrerenderOptions
) {
  const seen = new Set(staticPaths);
  const urls = [...seen];
  for (const url of urls) {
    const html = await render(url);
    const fileName = urlToFileName(url, createIndexFiles);

    // Insert the rendered markup into the index.html template:
    const source = template.replace(appHtmlPlaceholder, html);

    const dest = path.join(outDir, fileName);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, source);

    const links = getLinks(source);
    for (let link of links) {
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
