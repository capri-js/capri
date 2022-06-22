import { capri, CapriAdapterPluginOptions } from "capri/vite-plugin";

export default function (opts: CapriAdapterPluginOptions = {}) {
  const resolve = (f: string) => new URL(f, import.meta.url).pathname;
  return capri({
    ...opts,
    adapter: {
      hydrate: resolve("./hydrate.jsx"),
      island: {
        server: resolve("./island.server.jsx"),
      },
      lagoon: {
        client: resolve("./lagoon.client.jsx"),
      },
    },
  });
}
