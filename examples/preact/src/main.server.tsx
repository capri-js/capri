import { prerender } from "preact-iso";
import { Router } from "wouter-preact";

import { App } from "./App";

// Provide a base path. You only need this if you want to deploy your
// site to a non-root directory.
const base = import.meta.env.BASE_URL.slice(0, -1);

export async function render(url: string) {
  const result = await prerender(
    <Router base={base} ssrPath={url}>
      <App />
    </Router>,
  );
  return {
    "#app": result.html,
  };
}
