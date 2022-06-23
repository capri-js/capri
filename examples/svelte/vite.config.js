import capri from "@capri-js/svelte";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import { defineConfig } from "vite";

export default defineConfig((env) => ({
  ssr: {
    noExternal: ["svelte-pilot"],
  },
  plugins: [
    svelte({
      preprocess: [
        sveltePreprocess({
          preserve: ["json"],
        }),
      ],
      compilerOptions: {
        dev: env.command === "serve",
        hydratable: true,
      },
    }),
    capri(),
  ],
}));
