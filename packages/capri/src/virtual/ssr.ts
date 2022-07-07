import { render } from "virtual:capri-render";

import { renderHtml } from "../render.js";

const template = "%TEMPLATE%";

//prettier-ignore
const manifest = {/*MANIFEST*/};

export async function ssr(url: string) {
  return renderHtml(render, url, template, manifest);
}
