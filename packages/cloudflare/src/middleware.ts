import ssr from "virtual:capri-ssr";

const handler: PagesFunction = async ({ request, next }) => {
  // Handle the request as usual...
  const response = await next();
  if (
    response.status === 404 &&
    request.headers.get("accept")?.includes("text/html")
  ) {
    // No static asset was found and the browser accepts html.
    // Try to render the requested page...
    const path = new URL(request.url).pathname;

    let status = 200;
    const headers = new Headers({
      "Content-Type": "text/html; charset=utf-8",
    });

    const html = await ssr(path, {
      status: (code) => {
        status = code;
      },
      getHeader: request.headers.get.bind(request.headers),
      setHeader: headers.set.bind(headers),
    });
    if (html) {
      return new Response(html, { status, headers });
    }
  }
  return response;
};

export const onRequest = [handler];
