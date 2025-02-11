import "./main.css";

import { prerender } from "preact-iso";

import { App } from "./App.tsx";

export async function render(url: string) {
  const result = await prerender(<App path={url} />);
  return {
    "#app": result.html,
  };
}
