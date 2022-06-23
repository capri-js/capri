import { RenderFunction } from "@capri-js/svelte/server";
import { Router, ServerApp } from "svelte-pilot";

import routes from "./routes.js";

export const render: RenderFunction = async (url: string) => {
  const router = new Router({ routes, mode: "server" });
  const matched = await router.handle(url);
  if (!matched) throw new Error(`No matching route: ${url}`);
  const { route, ssrState } = matched;
  const { head, html } = ServerApp.render({ router, route, ssrState });
  return {
    head,
    body: html,
  };
};
