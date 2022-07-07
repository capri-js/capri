import render from "capri:ssr";

/**
 * @param {Request} request
 */
export default async (request, event) => {
  const url = new URL(request.url).pathname;
  const html = await render(url);
  return new Response(html);
};
