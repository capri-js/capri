import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

import About from "./About.vue";
import Home from "./Home.vue";

const history = import.meta.env.SSR
  ? createMemoryHistory(import.meta.env.BASE_URL)
  : createWebHistory(import.meta.env.BASE_URL);

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
  {
    path: "/preview",
    redirect: (to) => {
      const slug = to.query["slug"];
      return { path: typeof slug === "string" ? slug : "/" };
    },
  },
];

export default () => createRouter({ routes, history });
