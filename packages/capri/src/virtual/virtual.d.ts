declare module "virtual:capri-hydration-adapter" {
  import { HydrationAdapter } from "./hydration.js";
  declare const adapter: HydrationAdapter;
  export default adapter;
}

declare module "virtual:capri-islands" {
  export const islandGlobPattern: string;
  export const islands: Record<string, any>;
}
