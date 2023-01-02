declare module "virtual:capri-hydration-adapter" {
  export default (
    component: any,
    props: Record<string, unknown>,
    element: Element
  ) => any;
}

declare module "virtual:capri-render" {}
