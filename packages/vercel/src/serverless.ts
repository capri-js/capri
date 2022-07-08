import type { IncomingMessage, ServerResponse } from "node:http";
import ssr from "virtual:capri-ssr";

export default async (req: IncomingMessage, res: ServerResponse) => {
  console.log("Request URL", req.url);
  console.log("Headers", req.headers);
  const html = await ssr(new URL(req.url!).pathname);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(html);
};
