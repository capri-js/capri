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
    async build({ ssrBundle, outDir }) {
      const dirName = path.dirname(new URL(import.meta.url).pathname);
      const funcDir = path.resolve(outDir, "functions");

      // Copy the handler
      fsutils.copy(
        path.resolve(dirName, "middleware.js"),
        path.resolve(funcDir, "_middleware.js"),
        {
          replace: {
            "virtual:capri-ssr": "./ssr.js",
          },
        }
      );

      // Copy the ssrBundle
      fsutils.copy(ssrBundle, path.resolve(funcDir, "ssr.js"));
    },
  };
}
