import { capri, CapriAdapterPluginOptions } from "capri";

export * from "./server.js";
export type { RenderFunction, RenderResult, ServerEntry } from "capri";

export default function (opts: CapriAdapterPluginOptions = {}) {
  return capri({
    ...opts,
    hydrate: "@capri-js/preact/lib/hydrate.js",
  });
}
