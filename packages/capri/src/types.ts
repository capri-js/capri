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

export interface IslandOptions {
  media?: string;
}
