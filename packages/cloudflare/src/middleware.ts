import ssr from "virtual:capri-ssr";

const handler: PagesFunction = async ({ request, next }) => {
  const path = new URL(request.url).pathname;
  const response = await next();
  if (
    response.status === 404 &&
    request.headers.get("accept")?.includes("text/html")
  ) {
    const headers = new Headers({
      "Content-Type": "text/html; charset=utf-8",
    });
    const html = await ssr(path, {
      headers: request.headers,
      setHeader: headers.set.bind(headers),
    });
    return new Response(html, { headers });
  }
  return response;
};

export const onRequest = [handler];
