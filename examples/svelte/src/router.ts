import { Router } from "svelte-pilot";

import * as About from "./About.svelte";
import * as Home from "./Home.svelte";

const routes = [
  {
    path: "/",
    component: Home,
  },

  {
    path: "/about",
    component: About,
  },
];

export default new Router({
  routes,
  base: import.meta.env.BASE_URL,
  mode: import.meta.env.SSR ? "server" : "client",
});
