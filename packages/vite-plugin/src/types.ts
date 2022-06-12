import { FollowLinksConfig, PrerenderConfig } from "capri/src/prerender";
import { IslandPluginOptions } from "vite-plugin-island";

export type { RenderFunction, RenderResult, ServerEntry } from "capri";

export interface CapriPluginOptions extends IslandPluginOptions {
  spa?: string | false;
  createIndexFiles?: boolean;
  prerender?: PrerenderConfig;
  followLinks?: FollowLinksConfig;
}

type AdapterProvidedOptions = Pick<
  CapriPluginOptions,
  "hydrate" | "renderMarkerFragment"
>;

export type CapriAdapterPluginOptions = Omit<
  CapriPluginOptions,
  keyof AdapterProvidedOptions
>;
