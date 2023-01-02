/**
 * Virtual module that inlines the index.html upon build.
 */
import * as renderModule from "virtual:capri-server-entry";

import { renderHtml } from "../render.js";
import { RenderContext } from "../types.js";

const render: any = renderModule;
const renderFn = render.render ?? render.default;

const template = "%TEMPLATE%";

const css: string[] = __CSS_ASSETS__;

export default async function ssr(url: string, context: RenderContext) {
  return renderHtml(renderFn, url, template, css, context);
}
