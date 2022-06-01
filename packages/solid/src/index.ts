/// <reference types="vite-plugin-island/types" />

import capri, { CapriAdapterPluginOptions } from "@capri-js/vite-plugin";

export type {
  GetStaticPaths,
  RenderFunction,
  RenderResult,
  ServerEntry,
} from "@capri-js/vite-plugin";

export default function (opts: CapriAdapterPluginOptions = {}) {
  return [
    {
      name: "@capri-js/solid-config",
      config() {
        return {
          ssr: {
            noExternal: ["solid-app-router"],
          },
        };
      },
    },
    capri({
      ...opts,
      hydrate: "@capri-js/solid/lib/hydrate.js",
      renderMarkerFragment: "@capri-js/solid/lib/renderMarkerFragment.jsx",
    }),
  ];
}
