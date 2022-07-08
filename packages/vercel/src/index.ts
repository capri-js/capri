import { fsutils } from "capri";
import { BuildTarget } from "capri/vite-plugin";
import * as path from "path";

export default function vercel(config = {}): BuildTarget {
  return {
    config() {
      return {
        build: {
          outDir: path.join(".vercel", "output", "static"),
        },
        ssr: {
          target: "webworker",
          noExternal: true,
        },
      };
    },
    async build({ ssrBundle, outDir }) {
      const dirName = path.dirname(new URL(import.meta.url).pathname);
      const rootDir = path.resolve(outDir, "..");
      const funcDir = path.resolve(rootDir, "functions", "render.func");
      fsutils.copy(ssrBundle, path.resolve(funcDir, "ssr.js"));
      fsutils.write(
        path.resolve(funcDir, ".vc-config.json"),
        JSON.stringify({
          runtime: "edge",
          entrypoint: "index.js",
        })
      );
      fsutils.copy(
        path.resolve(dirName, "render.js"),
        path.resolve(funcDir, "index.js"),
        {
          replace: {
            "virtual:capri-ssr": "./ssr.js",
          },
        }
      );
      fsutils.write(
        path.resolve(rootDir, "config.json"),
        JSON.stringify({
          version: 3,
          routes: [
            {
              handle: "filesystem",
            },
            {
              src: "/.*",
              middlewarePath: "render",
            },
          ],
        })
      );
    },
  };
}
