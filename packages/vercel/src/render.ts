import ssr from "virtual:capri-ssr";

export default async (request: Request) => {
  const url = new URL(request.url).pathname;
  const html = await ssr(url);
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
