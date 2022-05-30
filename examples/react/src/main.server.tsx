import { StrictMode } from "react";
import renderToString from "react-render-to-string";
import { StaticRouter } from "react-router-dom/server.js";

import { App } from "./App";

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
