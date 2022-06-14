export type RenderResult = Record<string, string | Promise<string>>;
export type RenderFunction = (
  url: string
) => RenderResult | Promise<RenderResult>;

export interface ServerEntry {
  render: RenderFunction;
}

import { FollowLinksConfig, PrerenderConfig } from "./prerender.js";
export interface CapriPluginOptions {
  spa?: string | false;
  createIndexFiles?: boolean;
  prerender?: PrerenderConfig;
  followLinks?: FollowLinksConfig;
  islandGlobPattern?: string;
  hydrate: string;
}

export type CapriAdapterPluginOptions = Omit<CapriPluginOptions, "hydrate">;

export type HydrationAdapter = {
  hydrate: (component: any, props: object, element: Element) => void;
  renderRawHtml: (attributes: object, html: string) => any;
};
