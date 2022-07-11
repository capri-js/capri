// Cloudflare workers currently don't support streams_enable_constructors.
// As a workaround we have to include this polyfill:
import "web-streams-polyfill/es2018";

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
      const headers = new Headers({
        "Content-Type": "text/html; charset=utf-8",
      });
      const html = await ssr(path, {
        headers: request.headers,
        setHeader: headers.set.bind(headers),
      });
      if (html) {
        return new Response(html, { headers });
      }
    }
    return response;
  },
};

export default handler;
