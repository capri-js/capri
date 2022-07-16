import { EventEmitter } from "events";
import { ReactNode } from "react";
import { renderToPipeableStream } from "react-dom/server";

export default function renderToString(element: ReactNode) {
  return new Promise<string>((resolve, reject) => {
    const stream = renderToPipeableStream(element, {
      onError(err) {
        reject(err);
      },
      onAllReady() {
        stream.pipe(
          new StreamReader((html) => {
            resolve(stripComments(html));
          })
        );
      },
    });
  });
}

function stripComments(html: string) {
  return html.replace(/<!--[\s\S]*?(?:-->)/g, "");
}

/**
 * Naive WriteableStream implementation that captures chunks in memory
 * ands invokes a callback with the concatenated result as utf8 string
 * once the end of the stream is signaled.
 */
export class StreamReader
  extends EventEmitter
  implements NodeJS.WritableStream
{
  writable = true;
  private chunks: Buffer[] = [];
  constructor(private cb: (s: string) => void) {
    super();
  }
  write(chunk: Uint8Array | string) {
    this.chunks.push(Buffer.from(chunk));
    return true;
  }
  end() {
    this.cb(Buffer.concat(this.chunks).toString("utf8"));
    return this;
  }
}
