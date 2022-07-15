export type Markup = Record<string, string | Promise<string>>;
export type RenderResult = Markup | null | undefined;

export type RenderContext = {
  getHeader(name: string): string | null;
  setHeader(name: string, value: string): void;
};

export type RenderFunction = (
  url: string,
  context: RenderContext
) => RenderResult | Promise<RenderResult>;

export interface IslandOptions {
  media?: string;
}
