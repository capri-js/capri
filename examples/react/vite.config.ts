import capri from "@capri-js/react";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.BASE ?? "/",
  plugins: [
    react(),
    capri({
      spa: "/preview",
    }),
  ],
});
