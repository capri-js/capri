import { ComponentType, createElement } from "react";
import { hydrateRoot } from "react-dom/client";

export function hydrate(
  component: ComponentType,
  props: object,
  element: Element
) {
  return hydrateRoot(element.parentElement!, createElement(component, props));
}
