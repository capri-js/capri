import type { FollowLinksConfig } from "./prerender.js";
import { SitemapOptions } from "./sitemap.js";
import { PrerenderConfig } from "./types.js";
import type { Wrapper, WrapperInjectionHook } from "./wrapper.js";

export interface Adapter {
  hydrate: string;
  island: Wrapper;
  injectWrapper?: WrapperInjectionHook;
}

export interface CapriPluginOptions {
  createIndexFiles?: boolean;
  prerender?: PrerenderConfig;
  followLinks?: FollowLinksConfig;
  islandGlobPattern?: string;
  adapter: Adapter;
  spa?: string | false;
  commonJs?: boolean;
  inlineCss?: boolean;
  sitemap?: SitemapOptions;
}

export type CapriAdapterPluginOptions = Omit<CapriPluginOptions, "adapter">;
