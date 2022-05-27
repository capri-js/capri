import { ComponentType, h, hydrate as hydrateComponent } from "preact";

export function hydrate(
  component: ComponentType,
  props: object,
  element: Element
) {
  return hydrateComponent(h(component, props), element.parentElement!);
}
