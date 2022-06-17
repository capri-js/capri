import { RenderFunction, renderToString } from "@capri-js/react";
import { StrictMode } from "react";
import { StaticRouter } from "react-router-dom/server.js";

import { App } from "./App";

export const render: RenderFunction = async (url: string) => {
  return {
    "#app": await renderToString(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>
    ),
  };
};
