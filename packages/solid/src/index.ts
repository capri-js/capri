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
      // In order to make solid-app-router work in SSR mode we have to
      // prevent it from being externalized ...
      name: "@capri-js/solid-router-fix",
      config() {
        return {
          ssr: {
            noExternal: ["solid-app-router"],
          },
        } as any;
      },
    },
    capri({
      ...opts,
      hydrate: "@capri-js/solid/lib/hydrate.js",
      renderMarkerFragment: "@capri-js/solid/lib/renderMarkerFragment.jsx",
    }),
  ];
}
