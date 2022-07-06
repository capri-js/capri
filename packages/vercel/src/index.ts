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
    async build({ manifest, ssrBundle, template, outDir }) {
      const rootDir = path.resolve(outDir, "..");
      const dirName = path.dirname(new URL(import.meta.url).pathname);
      fsutils.copy(
        ssrBundle,
        path.resolve(rootDir, "functions", "render.func", "render.js")
      );
      fsutils.copy(path.resolve(dirName, "..", "files"), rootDir, {
        replace: {
          "capri:render": "./render.js",
          '"%TEMPLATE%"': JSON.stringify(template),
          "{/*MANIFEST*/}": JSON.stringify(manifest),
        },
      });
      fsutils.write(
        path.resolve(rootDir, "functions", "render.prerender-config.json"),
        JSON.stringify(config.isg)
      );

      fsutils.write(
        path.resolve(rootDir, "config", "routes.json"),
        JSON.stringify([
          {
            handle: "filesystem",
          },
          {
            src: "/.*",
            dest: ".vercel/output/functions/render",
          },
        ])
      );
    },
  };
}