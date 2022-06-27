import capri from "@capri-js/vue";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vue(),
    capri({
      spa: "/preview",
    }),
  ],
});
