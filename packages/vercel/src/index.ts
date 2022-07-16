import { BuildTarget } from "capri/vite-plugin";
import { builtinModules } from "module";
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
}: VercelConfig = {}): BuildTarget {
  return {
    config() {
      return {
        build: {
          outDir: path.join(".vercel", "output", "static"),
        },
        ssr: {
          target: edge ? "webworker" : "node",
          // Inline everything except for node builtins...
          noExternal: /.*/,
          external: builtinModules,
        },
      };
    },
    async build({ outDir, bundle, fsutils }) {
      const dirName = path.dirname(new URL(import.meta.url).pathname);
      const rootDir = path.resolve(outDir, "..");
      const funcDir = path.resolve(rootDir, "functions", "render.func");

      if (!edge) {
        // Create package.json to enable ESM
        fsutils.write(
          path.resolve(funcDir, "package.json"),
          JSON.stringify({ type: "module" })
        );
      }

      // Create the handler
      await bundle(
        path.resolve(
          dirName,
          edge ? "edge.js" : isg ? "isg.js" : "serverless.js"
        ),
        path.resolve(funcDir, "index.js"),
        {
          platform: edge ? "browser" : "node",
        }
      );

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

      if (isg) {
        if (edge) {
          throw new Error(
            "Incremental Static Generation is not supported on the edge."
          );
        }
        fsutils.write(
          path.resolve(funcDir, "..", "render.prerender-config.json"),
          JSON.stringify({ allowQuery: [], ...isg })
        );
      }

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
              src: isg ? "(?<path>.*)" : "/.*",
              [edge ? "middlewarePath" : "dest"]: "render",
            },
          ],
        })
      );
    },
  };
}
