import * as path from "path";
import { writeFile } from "fs/promises";
import { findLinks } from "./links.js";
import { urlToFileName } from "./utils.js";

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

    await writeFile(path.join(outDir, fileName), source);

    const links = findLinks(source);
    for (let link of links) {
      if (!seen.has(link)) {
        seen.add(link);
        urls.push(link);
      }
    }
  }
}
