import { RenderFunction } from "@capri-js/svelte/server";
import { Router, ServerApp } from "svelte-pilot";

import routes from "./routes.js";

export const render: RenderFunction = async (url: string) => {
  const router = new Router({
    routes,
    base: import.meta.env.BASE_URL,
    mode: "server",
  });
  const matched = await router.handle(`http://127.0.0.1${url}`);
  if (!matched) throw new Error(`No matching route: ${url}`);
  const { route, ssrState } = matched;
  const { head, html } = ServerApp.render({ router, route, ssrState });
  return {
    head,
    body: html,
  };
};
