import { ComponentType, h } from "preact";
export function renderMarkerFragment(
  Component: ComponentType,
  props: object,
  scriptProps: object,
  json: string
) {
  return (
    // In order to hydrate a Preact component it must be the first child element.
    // To guarantee this, we wrap it in an extra div and set it to
    // `display: contents` in order to not affect the styling.
    h(
      "div",
      { "data-island-root": true, style: { display: "contents" } },
      h(Component, props),
      h("script", { ...scriptProps, dangerouslySetInnerHTML: { __html: json } })
    )
  );
}
