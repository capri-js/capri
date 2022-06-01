import type { RenderFunction } from "@capri-js/preact";
import { prerender } from "preact-iso";

import { App } from "./App";

export const render: RenderFunction = async (url: string) => {
  const res = await prerender(<App url={url} />);
  return {
    "#app": res.html,
  };
};
