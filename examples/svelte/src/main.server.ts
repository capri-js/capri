import { RenderFunction } from "@capri-js/svelte/server";

import App from "./App.svelte";

export const render: RenderFunction = async (url: string) => {
  const { head, html } = App.render({ url });
  return {
    head: head,
    body: html,
  };
};
