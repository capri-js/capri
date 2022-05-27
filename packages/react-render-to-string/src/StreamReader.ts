import { EventEmitter } from "events";

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
