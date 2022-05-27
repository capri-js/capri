import { defineConfig } from "vite";
import capri from "@capri/solid";
import solid from "vite-plugin-solid";

export default defineConfig({
  build: {
    //minify: false,
    polyfillModulePreload: false,
  },
  plugins: [
    solid({
      ssr: true,
    }),
    capri({
      spa: "preview.html",
      ssr: "src/main.server.tsx",
      prerenderUrls: ["/", "/foo/"],
      createIndexFiles: false,
    }),
  ],
});
