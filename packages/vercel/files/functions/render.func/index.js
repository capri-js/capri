import { ssr } from "capri:ssr";

/**
 * @param {Request} request
 */
export default async (request, event) => {
  const url = new URL(request.url).pathname;
  const html = await ssr(url);
  return new Response(html);
};
