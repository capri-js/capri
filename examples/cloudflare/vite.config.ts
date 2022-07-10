import cloudflare from "@capri-js/cloudflare";
import capri from "@capri-js/react";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    capri({
      spa: "/preview",
      prerender: false,
      followLinks: false,
      target: cloudflare(),
    }),
  ],
});
