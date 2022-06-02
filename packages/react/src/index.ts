/// <reference types="vite-plugin-island/types" />

export type {
  GetStaticPaths,
  RenderFunction,
  RenderResult,
  ServerEntry,
} from "@capri-js/vite-plugin";

import capri, { CapriAdapterPluginOptions } from "@capri-js/vite-plugin";

export default function (opts: CapriAdapterPluginOptions = {}) {
  return capri({
    ...opts,
    hydrate: "@capri-js/react/lib/hydrate.js",
    renderMarkerFragment: "@capri-js/react/lib/renderMarkerFragment.js",
  });
}
