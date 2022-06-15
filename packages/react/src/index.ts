export type { RenderFunction, RenderResult, ServerEntry } from "capri";

import { capri, CapriAdapterPluginOptions } from "capri";

export default function (opts: CapriAdapterPluginOptions = {}) {
  return capri({
    ...opts,
    hydrate: "@capri-js/react/hydrate",
  });
}
