import type { ConfigEnv, SSROptions, UserConfig } from "vite";

import type { BundleOptions } from "./bundle.js";
import type * as fsutils from "./fsutils.js";
import type { FollowLinksConfig, PrerenderConfig } from "./prerender.js";
import type { Wrapper, WrapperInjectionHook } from "./wrapper.js";

export interface Adapter {
  hydrate: string;
  island: Wrapper;
  lagoon: Wrapper;
  injectWrapper?: WrapperInjectionHook;
}

export interface BuildArgs {
  rootDir: string;
  outDir: string;
  ssrBundle: string;
  prerendered: string[];
  fsutils: typeof fsutils;
  bundle: (
    input: string,
    output: string,
    options?: BundleOptions
  ) => Promise<void>;
}

interface ViteConfig extends UserConfig {
  ssr?: SSROptions;
}

export interface BuildTarget {
  config?: (
    config: ViteConfig,
    env: ConfigEnv
  ) => ViteConfig | null | void | Promise<ViteConfig | null | void>;
  build: (args: BuildArgs) => Promise<void>;
}
export interface CapriPluginOptions {
  createIndexFiles?: boolean;
  prerender?: PrerenderConfig;
  followLinks?: FollowLinksConfig;
  islandGlobPattern?: string;
  lagoonGlobPattern?: string;
  adapter: Adapter;
  target?: BuildTarget | string;
  spa?: string | false;
}

export type CapriAdapterPluginOptions = Omit<CapriPluginOptions, "adapter">;
