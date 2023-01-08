import ssr from "virtual:capri-ssr";

export default async (request: Request) => {
  const url = new URL(request.url).pathname;

  let status = 200;
  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });

  const html = await ssr(url, {
    status(code) {
      status = code;
    },
    getHeader: request.headers.get.bind(request.headers),
    setHeader: headers.set.bind(headers),
  });
  return new Response(html, {
    status,
    headers,
  });
};
