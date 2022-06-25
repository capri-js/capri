import "./global.css";

import { ClientApp } from "svelte-pilot";

import router from "./router.js";

new ClientApp({
  target: document.body,
  props: {
    router,
  },
});
