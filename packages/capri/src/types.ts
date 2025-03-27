import type { Readable } from "node:stream";

export type StreamResult = { prelude: Readable };

export type RenderedHtml =
  | string
  | StreamResult
  | Promise<string>
  | Promise<StreamResult>;

export type RenderResult =
  | RenderedHtml
  | Record<string, RenderedHtml>
  | null
  | undefined;

export function isStreamResult(result: unknown): result is StreamResult {
  return typeof result === "object" && result !== null && "prelude" in result;
}

export type RenderFunction = (
  url: string,
) => RenderResult | Promise<RenderResult>;

export type PrerenderConfig =
  | false
  | string
  | string[]
  | GetStaticPathsFunction;

export type GetStaticPathsFunction = () => string[] | Promise<string[]>;

export interface IslandOptions {
  /**
   * Media query that must match for the island to be hydrated
   */
  media?: string;
  /**
   * Loading strategy for the island
   * - 'eager': Hydrate immediately (default)
   * - 'idle': Hydrate when the browser is idle
   * - 'visible': Hydrate when the island enters the viewport
   */
  loading?: "eager" | "idle" | "visible";
}
