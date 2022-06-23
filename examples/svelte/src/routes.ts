import * as About from "./About.svelte";
import * as Home from "./Home.svelte";

export default [
  {
    path: "/",
    component: Home,
  },

  {
    path: "/about",
    component: About,
  },
];
