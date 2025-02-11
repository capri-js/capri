import "./main.css";

import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";

import { App } from "./App.tsx";

export async function render(url: string) {
  const root = (
    <StrictMode>
      <App path={url} />
    </StrictMode>
  );
  return {
    "#app": prerenderToNodeStream(root),
  };
}
