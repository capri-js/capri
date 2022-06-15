export type RenderResult = Record<string, string | Promise<string>>;
export type RenderFunction = (
  url: string
) => RenderResult | Promise<RenderResult>;
