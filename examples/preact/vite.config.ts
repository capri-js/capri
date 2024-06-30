import capri from "@capri-js/preact";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    preact(),
    capri({
      spa: "/preview",
    }),
  ],
});
