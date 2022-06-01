import { Router } from "solid-app-router";
import { generateHydrationScript, renderToStringAsync } from "solid-js/web";

import { App } from "./App";

export async function render(url: string) {
  const html = await renderToStringAsync(() => (
    <Router url={url}>
      <App />
    </Router>
  ));
  return {
    "#app": html,
    body: generateHydrationScript(),
  };
}
