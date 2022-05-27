/// <reference types="vite-plugin-island/types" />

import capri, { CapriAdapterPluginOptions } from "@capri/vite-plugin";

export default function (opts: CapriAdapterPluginOptions) {
  return capri({
    ...opts,
    hydrate: "@capri/react/lib/hydrate.js",
    renderMarkerFragment: "@capri/react/lib/renderMarkerFragment.jsx",
  });
}
