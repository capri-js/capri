import { IslandPluginOptions } from "vite-plugin-island";

export type {
  GetStaticPaths,
  RenderFunction,
  RenderResult,
  ServerEntry,
} from "capri";

export interface CapriPluginOptions extends IslandPluginOptions {
  spa?: string;
  createIndexFiles?: boolean;
}

type AdapterProvidedOptions = Pick<
  CapriPluginOptions,
  "hydrate" | "renderMarkerFragment"
>;

export type CapriAdapterPluginOptions = Omit<
  CapriPluginOptions,
  keyof AdapterProvidedOptions
>;
