import { RenderFunction, renderToString } from "@capri-js/preact/server";
import { Router } from "wouter-preact";

import { App } from "./App";

// Provide a base path. You only need this if you want to deploy your
// site to a non-root directory.
const base = import.meta.env.BASE_URL.slice(0, -1);

export const render: RenderFunction = async (url: string) => {
  const html = await renderToString(
    <Router base={base} ssrPath={url}>
      <App />
    </Router>
  );
  return {
    "#app": html,
  };
};
