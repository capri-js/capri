/// <reference types="vite-plugin-island/types" />

import capri, { CapriAdapterPluginOptions } from "@capri-js/vite-plugin";

export default function (opts: CapriAdapterPluginOptions) {
  return capri({
    ...opts,
    hydrate: "@capri-js/react/lib/hydrate.js",
    renderMarkerFragment: "@capri-js/react/lib/renderMarkerFragment.jsx",
  });
}
