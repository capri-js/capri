/// <reference types="vite-plugin-island/types" />

import capri, { CapriAdapterPluginOptions } from "@capri/vite-plugin";

export { prerender } from "./prerender.js";

export default function (opts: CapriAdapterPluginOptions) {
  return capri({
    ...opts,
    hydrate: "@capri/preact/lib/hydrate.js",
    renderMarkerFragment: "@capri/preact/lib/renderMarkerFragment.jsx",
  });
}
