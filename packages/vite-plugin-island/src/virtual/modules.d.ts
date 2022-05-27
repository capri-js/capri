declare module "virtual:island-renderMarkerFragment" {
  export function renderMarkerFragment(
    component: any,
    props: any,
    scriptProps: object,
    scriptContent: string
  ): any;
}

declare module "virtual:island-hydrate" {
  export function hydrate(component: any, props: any, element: Element): any;
}
