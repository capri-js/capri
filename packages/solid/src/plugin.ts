import { capri, CapriAdapterPluginOptions } from "capri";

export type { RenderFunction, RenderResult, ServerEntry } from "capri";

export default function (opts: CapriAdapterPluginOptions = {}) {
  return capri({
    ...opts,
    hydrate: "@capri-js/solid/hydrate",
  });
}
