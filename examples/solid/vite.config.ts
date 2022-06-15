import capri from "@capri-js/solid/vite-plugin";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  base: process.env.BASE ?? "/",
  ssr: {
    // In order to make solid-app-router work in SSR mode we have to
    // prevent it from being externalized ...
    noExternal: ["solid-app-router"],
  },
  plugins: [
    solid({
      ssr: true,
    }),
    capri({
      spa: "/preview",
    }),
  ],
});
