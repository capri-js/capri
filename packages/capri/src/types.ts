export type RenderResult = Record<string, string | Promise<string>>;
export type RenderFunction = (
  url: string
) => RenderResult | Promise<RenderResult>;
export type GetStaticPaths = () => string[] | Promise<string[]>;

export interface ServerEntry {
  render: RenderFunction;
  getStaticPaths?: GetStaticPaths;
}
