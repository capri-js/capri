import { ReactNode } from "react";
import { renderToReadableStream } from "react-dom/server";

export default async function renderToString(children: ReactNode) {
  const stream = await renderToReadableStream(children);
  await stream.allReady;
  return readableStreamToString(stream);
}

async function readableStreamToString(readableStream: ReadableStream) {
  const reader = readableStream.getReader();
  const decoder = new TextDecoder();
  try {
    let result = "";
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return result;
      }
      result += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}
