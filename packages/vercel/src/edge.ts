import ssr from "virtual:capri-ssr";

export default async (request: Request) => {
  const url = new URL(request.url).pathname;

  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  const html = await ssr(url, {
    headers: request.headers,
    setHeader: headers.set.bind(headers),
  });
  return new Response(html, {
    headers,
  });
};
