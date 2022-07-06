import { renderHtml } from "capri";
import render from "capri:render";

// prettier-ignore
const manifest = {/*MANIFEST*/};

const template = "%TEMPLATE%";

/**
 * @param {Request} request
 */
export default async (request, event) => {
  const url = new URL(request.url).pathname;
  const html = await renderHtml(render, url, template, manifest);
  return new Response(html);
};
