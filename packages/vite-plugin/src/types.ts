import { IslandPluginOptions } from "vite-plugin-island";

export type RenderFunction = (url: string) => string | Promise<string>;
export type GetStaticPaths = () => string[] | Promise<string[]>;

export interface ServerEntry {
  render: RenderFunction;
  getStaticPaths?: GetStaticPaths;
}

export interface CapriOptions extends IslandPluginOptions {
  spa?: string;
  appHtmlPlaceholder?: string;
  createIndexFiles?: boolean;
}

type AdapterProvidedOptions = Pick<
  CapriOptions,
  "hydrate" | "renderMarkerFragment"
>;

export type CapriAdapterPluginOptions = Omit<
  CapriOptions,
  keyof AdapterProvidedOptions
>;
