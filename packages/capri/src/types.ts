export type RenderFunction = (url: string) => string | Promise<string>;
export type GetStaticPaths = () => string[] | Promise<string[]>;

export interface ServerEntry {
  render: RenderFunction;
  getStaticPaths?: GetStaticPaths;
}
