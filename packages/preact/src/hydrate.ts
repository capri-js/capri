import { ComponentType, h, hydrate as hydrateComponent } from "preact";

export default function hydrate(
  component: ComponentType,
  props: Record<string, unknown>,
  element: Element
) {
  const children = element.querySelector("capri-children");
  if (children) {
    props.children = h("capri-children", {
      style: { display: "contents" },
      dangerouslySetInnerHTML: { __html: "" },
    });
  }
  return hydrateComponent(h(component, props), element.parentElement!);
}
