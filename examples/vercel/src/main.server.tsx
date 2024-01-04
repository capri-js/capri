import { RenderFunction, renderToString } from "@capri-js/react/server";
import { StrictMode } from "react";
import { StaticRouter } from "react-router-dom/server.js";

import { App } from "./App";

export const render: RenderFunction = async (url, context) => {
  context.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=60");
  return {
    "#app": await renderToString(
      <StrictMode>
        <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
          <App />
        </StaticRouter>
      </StrictMode>,
    ),
  };
};
