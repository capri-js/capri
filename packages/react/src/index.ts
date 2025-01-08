import { capri, CapriAdapterPluginOptions } from "capri/vite-plugin";
import type { Plugin } from "vite";

export type { RenderFunction } from "capri";

export default function (opts: CapriAdapterPluginOptions = {}): Plugin[] {
  const resolve = (f: string) => new URL(f, import.meta.url).pathname;

  return [
    {
      name: "capri-react-config",
      config() {
        // In projects with only a server entry, Vite won't pick up the
        // dependencies correctly when running inside a dev-server.
        return {
          optimizeDeps: {
            include: ["react-dom/client"],
          },
        };
      },
    },
    ...capri({
      ...opts,
      adapter: {
        hydrate: resolve("./hydrate.js"),
        island: {
          server: resolve("./island.server.jsx"),
        },
      },
    }),
  ];
}
