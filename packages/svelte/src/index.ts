import { capri, CapriAdapterPluginOptions } from "capri/vite-plugin";

export default function (opts: CapriAdapterPluginOptions = {}) {
  const resolve = (f: string) => new URL(f, import.meta.url).pathname;
  return capri({
    ...opts,
    adapter: {
      hydrate: resolve("./hydrate.js"),
      island: {
        server: resolve("./island.server.js"),
      },
      lagoon: {
        server: resolve("./lagoon.server.js"),
        client: resolve("./lagoon.client.js"),
      },
    },
  });
}
