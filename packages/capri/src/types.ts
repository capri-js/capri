import type { Readable } from "node:stream";

export type Markup = Record<
  string,
  string | Promise<string> | Promise<{ prelude: Readable }>
>;
export type RenderResult = Markup | null | undefined;

export type RenderFunction = (
  url: string,
) => RenderResult | Promise<RenderResult>;

export interface IslandOptions {
  media?: string;
}
