import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import capri from "@capri-js/preact";

export default defineConfig({
  plugins: [
    preact(),
    capri({
      spa: "preview.html",
      createIndexFiles: false,
    }),
  ],
});
