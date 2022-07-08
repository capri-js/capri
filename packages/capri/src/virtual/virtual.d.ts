declare module "virtual:capri-hydrate" {
  export default (
    component: any,
    props: Record<string, unknown>,
    element: Element
  ) => any;
}

declare module "virtual:capri-render" {
  import { RenderFunction } from "../types.js";
  const render: RenderFunction;
  export default render;
  export { render };
}
