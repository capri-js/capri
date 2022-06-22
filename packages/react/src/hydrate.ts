import { ComponentType, createElement } from "react";
import { hydrateRoot } from "react-dom/client";

export default function hydrate(
  component: ComponentType,
  props: Record<string, any>,
  element: Element
) {
  const children = element.querySelector("capri-children");
  if (children) {
    props.children = createElement("capri-children", {
      style: { display: "contents" },
      dangerouslySetInnerHTML: { __html: "" },
    });
  }
  return hydrateRoot(element.parentElement!, createElement(component, props));
}
