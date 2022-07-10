import * as renderModule from "virtual:capri-render";

import { renderHtml } from "../render.js";
import { RenderContext } from "../types.js";

const render: any = renderModule;
const renderFn = render.render ?? render.default;

const template = "%TEMPLATE%";

//prettier-ignore
const manifest = {/*MANIFEST*/};

export default async function ssr(url: string, context: RenderContext) {
  return renderHtml(renderFn, url, template, manifest, context);
}
