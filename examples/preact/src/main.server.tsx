import { RenderFunction, renderToString } from "@capri-js/preact/server";

import { App } from "./App";

export const render: RenderFunction = async (url: string) => {
  const res = await renderToString(<App url={url} />);
  return {
    "#app": res.html,
  };
};
