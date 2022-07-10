import { BuildTarget } from "capri/vite-plugin";
import { builtinModules } from "module";
import * as path from "path";

interface VercelConfig {
  edge?: boolean;
}
export default function vercel({
  edge = false,
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
        path.resolve(dirName, edge ? "edge.js" : "serverless.js"),
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
    },
  };
}
