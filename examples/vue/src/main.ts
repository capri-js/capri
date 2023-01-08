import "./global.css";

import { createApp } from "vue";

import PreviewApp from "./PreviewApp.vue";
import createRouter from "./router.js";

const app = createApp(PreviewApp);
app.use(createRouter());

app.mount("#app");
