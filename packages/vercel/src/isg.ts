import type { IncomingMessage, ServerResponse } from "node:http";
import ssr from "virtual:capri-ssr";

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (!req.headers.accept?.includes("text/html")) {
    return res.writeHead(404).end();
  }
  const route = req.headers["x-now-route-matches"];
  if (typeof route !== "string") {
    return res.writeHead(400, "Header x-now-route-matches expected").end();
  }
  const match = decodeURIComponent(new URLSearchParams(route).get("1")!);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  const html = await ssr(match, {
    headers: req.headers,
    setHeader: res.setHeader.bind(res),
  });
  res.end(html);
};
