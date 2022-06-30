import "./global.css";

import { createApp } from "vue";

import App from "./App.vue";
import createRouter from "./router.js";

const app = createApp(App);
app.use(createRouter());

app.mount("#app");
