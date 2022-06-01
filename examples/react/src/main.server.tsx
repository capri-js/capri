import { RenderFunction } from "@capri-js/react";
import { StrictMode } from "react";
import renderToString from "react-render-to-string";
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
