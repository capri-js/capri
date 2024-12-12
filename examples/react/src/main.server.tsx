import "./main.css";

import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { routes } from "./routes.jsx";

export async function render(url: string) {
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
    "#app": prerenderToNodeStream(root),
  };
}

function isInitialized(router: ReturnType<typeof createMemoryRouter>) {
  return new Promise<void>((resolve) => {
    if (router.state.initialized) return resolve();
    router.subscribe((state) => {
      if (state.initialized) resolve();
    });
  });
}
