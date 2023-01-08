import "./global.css";

import { RenderFunction } from "@capri-js/vue/server";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";

import App from "./App.vue";
import createRouter from "./router.js";

export const render: RenderFunction = async (url, context) => {
  const app = createSSRApp(App);
  const router = createRouter();
  app.use(router);

  // Note: vue-router's MemoryHistory does not strip the base, so we have to do
  // it manually. If you don't use a BASE_URL you can skip this step:
  const relativeUrl = url.slice(import.meta.env.BASE_URL.length);

  router.push(relativeUrl);

  await router.isReady();
  const { matched } = router.currentRoute.value;
  if (matched.length) {
    const html = await renderToString(app);
    return {
      "#app": html,
    };
  }
};
