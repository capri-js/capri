import { capri, CapriAdapterPluginOptions } from "capri/vite-plugin";

//export type { RenderFunction, RenderResult } from "capri";

export default function (opts: CapriAdapterPluginOptions = {}) {
  return capri({
    ...opts,
    hydrate: "@capri-js/solid/hydrate",
  });
}
