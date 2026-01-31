import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";

import { Router } from "./router.jsx";

export async function render(url: string) {
  const root = (
    <StrictMode>
      <Router path={url} />
    </StrictMode>
  );
  return {
    "#app": prerenderToNodeStream(root),
  };
}
