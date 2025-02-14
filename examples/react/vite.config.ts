import capri from "@capri-js/react";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    capri({
      sitemap: {
        origin: "https://capri-js.github.io",
      },
    }),
  ],
});
