import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";

import App from "./App.vue";
import createRouter from "./router.js";

export async function render(url: string) {
  const app = createSSRApp(App);
  const router = createRouter();
  app.use(router);
  router.push(`http://127.0.0.1${url}`);
  await router.isReady();
  const html = await renderToString(app);
  return {
    "#app": html,
  };
}
