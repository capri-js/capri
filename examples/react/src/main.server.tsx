import "./main.css";

import { RenderFunction, renderToString } from "@capri-js/react/server";
import type { Router } from "@remix-run/router";
import { StrictMode } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { routes } from "./routes.jsx";

export const render: RenderFunction = async (url, context) => {
  const router = createMemoryRouter(routes, {
    basename: import.meta.env.BASE_URL,
    initialEntries: [url],
  });

  // Wait until the data is loaded ...
  await isInitialized(router);

  const root = (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
  return {
    "#app": renderToString(root, context),
  };
};

function isInitialized(router: Router) {
  return new Promise<void>((resolve) => {
    if (router.state.initialized) return resolve();
    router.subscribe((state) => {
      if (state.initialized) resolve();
    });
  });
}
