import { fsutils } from "capri";
import { BuildTarget } from "capri/vite-plugin";
import * as path from "path";

interface VercelConfig {
  edge?: boolean;
  isg?: {
    expiration: number | false;
    bypassToken?: string;
  };
}
export default function vercel({
  edge = false,
  isg,
}: VercelConfig): BuildTarget {
  return {
    config() {
      return {
        build: {
          outDir: path.join(".vercel", "output", "static"),
        },
        ssr: {
          target: edge ? "webworker" : "node",
          noExternal: edge || [],
        },
      };
    },
    async build({ ssrBundle, outDir }) {
      const dirName = path.dirname(new URL(import.meta.url).pathname);
      const rootDir = path.resolve(outDir, "..");
      const funcDir = path.resolve(rootDir, "functions", "render.func");

      // Enable ESM support
      if (!edge) {
        fsutils.write(
          path.resolve(funcDir, "package.json"),
          JSON.stringify({ type: "module" })
        );
      }

      // Copy the handler
      fsutils.copy(
        path.resolve(dirName, edge ? "edge.js" : "serverless.js"),
        path.resolve(funcDir, "index.js"),
        {
          replace: {
            "virtual:capri-ssr": "./ssr.js",
          },
        }
      );

      // Copy the ssrBundle
      fsutils.copy(ssrBundle, path.resolve(funcDir, "ssr.js"));

      // Create .vc-config.json
      const runtime = edge
        ? { runtime: "edge" }
        : { runtime: "nodejs16.x", launcherType: "Nodejs" };

      fsutils.write(
        path.resolve(funcDir, ".vc-config.json"),
        JSON.stringify({
          ...runtime,
          [edge ? "entrypoint" : "handler"]: "index.js",
        })
      );

      // Create config.json
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
              [edge ? "middlewarePath" : "dest"]: "render",
            },
          ],
        })
      );

      // Create render.prerender-config.json
      if (isg) {
        if (edge) {
          throw new Error(
            "Incremental Static Generation is not supported on the edge."
          );
        }
        fsutils.write(
          path.resolve(funcDir, "..", "render.prerender-config.json"),
          JSON.stringify(isg)
        );
      }
    },
  };
}
