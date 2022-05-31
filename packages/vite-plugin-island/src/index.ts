/// <reference path="../types.d.ts" />

import * as fs from "fs";
import type { Plugin } from "vite";

export interface IslandPluginOptions {
  hydrate: string;
  renderMarkerFragment: string;
  islandGlobPattern?: string;
}

export default function island({
  islandGlobPattern = "/src/**/*.island.*",
  hydrate,
  renderMarkerFragment,
}: IslandPluginOptions): Plugin {
  function loadVirtualModule(name: string) {
    const source = fs.readFileSync(
      new URL(`./virtual/${name}`, import.meta.url).pathname,
      "utf8"
    );
    return source.replace(/%ISLAND_GLOB_PATTERN%/g, islandGlobPattern);
  }

  return {
    name: "vite-plugin-island",
    resolveId(source, importer, options) {
      if (source === "virtual:island") {
        return options?.ssr ? "\0virtual:island.ssr" : "\0virtual:island";
      }
      if (source === "virtual:island-hydration") {
        return "\0virtual:island-hydration";
      }
      if (source === "virtual:island-hydrate") {
        return this.resolve(hydrate);
      }
      if (source === "virtual:island-renderMarkerFragment") {
        return this.resolve(renderMarkerFragment);
      }
    },
    load(id) {
      const match = /^\0virtual:(island.*)/.exec(id);
      if (match) {
        const [, name] = match;
        return loadVirtualModule(`${name}.jsx`);
      }
    },
  };
}
