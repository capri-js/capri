import { fsutils } from "capri";
import { BuildTarget } from "capri/vite-plugin";
import * as path from "path";

export default function cloudflare(): BuildTarget {
  return {
    config() {
      return {
        ssr: {
          target: "webworker",
          noExternal: true,
        },
      };
    },
    async build({ ssrBundle, rootDir, outDir }) {
      const dirName = path.dirname(new URL(import.meta.url).pathname);
      const funcDir = path.resolve(rootDir, "functions");

      // Cloudflare treats projects without a 404 page as SPA.
      // To enable MPA mode we add a basic error page if no custom one exists.
      const notFound = path.resolve(outDir, "404.html");
      if (!fsutils.exists(notFound)) {
        fsutils.copy(
          path.resolve(dirName, "..", "files", "404.html"),
          notFound
        );
      }

      // Copy the handler
      fsutils.copy(
        path.resolve(dirName, "middleware.js"),
        path.resolve(funcDir, "_middleware.js"),
        {
          replace: {
            "virtual:capri-ssr": "./_ssr.js",
          },
        }
      );

      // Copy the ssrBundle
      fsutils.copy(ssrBundle, path.resolve(funcDir, "_ssr.js"));
    },
  };
}
