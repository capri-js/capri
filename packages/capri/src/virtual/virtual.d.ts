declare module "virtual:capri-hydrate" {
  export default (
    component: any,
    props: Record<string, unknown>,
    element: Element
  ) => any;
}
