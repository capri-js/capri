import "./global.css";

import { ClientApp, Router } from "svelte-pilot";

import routes from "./routes.js";
const router = new Router({ routes, base: import.meta.env.BASE_URL });

new ClientApp({
  target: document.body,
  props: {
    router,
  },
});
