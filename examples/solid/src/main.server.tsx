import { RenderFunction, renderToString } from "@capri-js/solid/server";
import { Router } from "solid-app-router";
import { generateHydrationScript } from "solid-js/web";

import { App } from "./App";

export const render: RenderFunction = async (url: string) => {
  const html = await renderToString(() => (
    <Router url={url}>
      <App />
    </Router>
  ));
  return {
    "#app": html,
    body: generateHydrationScript(),
  };
};
