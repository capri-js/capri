import capri from "@capri-js/react";
import vercel from "@capri-js/vercel";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    capri({
      spa: "/preview",
      prerender: false,
      target: vercel({
        isg: {
          expiration: 60,
        },
      }),
    }),
  ],
});
