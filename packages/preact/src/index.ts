/// <reference types="vite-plugin-island/types" />

import capri, { CapriAdapterPluginOptions } from "@capri-js/vite-plugin";

export { prerender } from "./prerender.js";
export type {
  RenderFunction,
  RenderResult,
  ServerEntry,
} from "@capri-js/vite-plugin";

export default function (opts: CapriAdapterPluginOptions = {}) {
  return capri({
    ...opts,
    hydrate: "@capri-js/preact/lib/hydrate.js",
    renderMarkerFragment: "@capri-js/preact/lib/renderMarkerFragment.js",
  });
}
