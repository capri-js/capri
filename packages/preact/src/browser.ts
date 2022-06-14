import { IslandOptions } from "capri";
import { ComponentChildren, ComponentType, Fragment, h } from "preact";

export function island<T extends ComponentType<any>>(
  component: T,
  options: IslandOptions = {}
) {
  // In the browser this island function is a no-op and returns the passed
  // component verbatim.
  return component;
}

export function StaticContent({ children }: { children: ComponentChildren }) {
  // In the browser the StaticContent component renders the children without
  // a wrapper as this will be provided by renderRawHtml.
  return h(Fragment, {}, children);
}
