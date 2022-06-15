import { capri, CapriAdapterPluginOptions } from "capri/vite-plugin";

export default function (opts: CapriAdapterPluginOptions = {}) {
  return capri({
    ...opts,
    hydrate: "@capri-js/preact/hydrate",
  });
}
