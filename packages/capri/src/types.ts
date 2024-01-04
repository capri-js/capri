import { RenderContext } from "./context.js";

export type Markup = Record<string, string | Promise<string>>;
export type RenderResult = Markup | null | undefined;

export type RenderFunction = (
  url: string,
  context: RenderContext,
) => RenderResult | Promise<RenderResult>;

export interface IslandOptions {
  media?: string;
}
