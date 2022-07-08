import { fsutils } from "capri";
import { BuildTarget } from "capri/vite-plugin";
import * as path from "path";

type PrerenderFunctionConfig = {
  expiration: number | false;
  group?: number;
  bypassToken?: string;
  fallback?: string;
  allowQuery?: string[];
};

interface VercelConfig {
  isg: PrerenderFunctionConfig;
}

export default function vercel(config: VercelConfig): BuildTarget {
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
      const rootDir = path.resolve(outDir, "..");
      const dirName = path.dirname(new URL(import.meta.url).pathname);
      fsutils.copy(
        ssrBundle,
        path.resolve(rootDir, "functions", "render.func", "ssr.js")
      );
      fsutils.copy(path.resolve(dirName, "..", "files"), rootDir, {
        replace: {
          "capri:ssr": "./ssr.js",
        },
      });
      fsutils.write(
        path.resolve(rootDir, "functions", "render.prerender-config.json"),
        JSON.stringify(config.isg)
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
              dest: "/render",
            },
          ],
        })
      );
    },
  };
}
