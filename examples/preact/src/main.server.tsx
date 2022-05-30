import { prerender } from "preact-iso";

import { App } from "./App";

export async function render(url: string) {
  const res = await prerender(<App url={url} />);
  return res.html;
}
