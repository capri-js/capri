import { ReactNode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StreamReader } from "./StreamReader.js";

export default function render(element: ReactNode) {
  return new Promise((resolve, reject) => {
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
