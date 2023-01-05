import type { IncomingMessage, ServerResponse } from "node:http";

import ssr from "virtual:capri-ssr";

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (!req.headers.accept?.includes("text/html")) {
    res.writeHead(404).end();
  } else {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const html = await ssr(req.url!, {
      status(code) {
        res.statusCode = code;
      },
      getHeader(name: string) {
        const header = req.headers[name] ?? null;
        return Array.isArray(header) ? header[0] : header;
      },
      setHeader: res.setHeader.bind(res),
    });
    res.end(html);
  }
};
