import type { FollowLinksConfig, PrerenderConfig } from "./prerender.js";
import type { Wrapper, WrapperInjectionHook } from "./wrapper.js";

export interface Adapter {
  hydrate: string;
  island: Wrapper;
  lagoon: Wrapper;
  injectWrapper?: WrapperInjectionHook;
}

export interface CapriPluginOptions {
  createIndexFiles?: boolean;
  prerender?: PrerenderConfig;
  followLinks?: FollowLinksConfig;
  islandGlobPattern?: string;
  lagoonGlobPattern?: string;
  adapter: Adapter;
  spa?: string | false;
}

export type CapriAdapterPluginOptions = Omit<CapriPluginOptions, "adapter">;
