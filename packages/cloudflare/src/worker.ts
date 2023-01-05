import ssr from "virtual:capri-ssr";

type Env = EventContext<any, any, any>["env"];
const handler: ExportedHandler<Env> = {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (
      response.status === 404 &&
      request.headers.get("accept")?.includes("text/html")
    ) {
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
  },
};

export default handler;
