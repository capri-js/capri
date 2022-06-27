import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";

import About from "./About.vue";
import Home from "./Home.vue";

const history = import.meta.env.SSR
  ? createMemoryHistory(import.meta.env.BASE_URL)
  : createWebHistory(import.meta.env.BASE_URL);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
];

export default () => createRouter({ routes, history });
