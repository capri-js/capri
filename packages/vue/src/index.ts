import { capri, CapriAdapterPluginOptions } from "capri/vite-plugin";

export default function (opts: CapriAdapterPluginOptions = {}) {
  const resolve = (f: string) => new URL(f, import.meta.url).pathname;
  return capri({
    ...opts,
    adapter: {
      injectWrapper: "onTransform",
      hydrate: resolve("./hydrate.js"),
      island: {
        server: resolve("./island.server.js"),
      },
      lagoon: {
        server: resolve("./lagoon.server.jsx"),
        client: resolve("./lagoon.client.jsx"),
      },
    },
  });
}
