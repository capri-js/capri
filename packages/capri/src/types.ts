export type RenderResult = Record<string, string | Promise<string>>;

export type RenderContext = {
  headers: string[];
  setHeader: (name: string, value: string) => void;
};

export type RenderFunction = (
  url: string,
  context: RenderContext
) => RenderResult | Promise<RenderResult>;

export interface IslandOptions {
  media?: string;
}
