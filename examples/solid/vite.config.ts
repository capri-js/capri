import capri from "@capri-js/solid";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solid({
      ssr: true,
    }),
    capri({
      spa: "/preview",
    }),
  ],
});
