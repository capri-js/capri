import { ComponentType, createElement } from "react";

export function renderMarkerFragment(
  Component: ComponentType,
  props: object,
  scriptProps: object,
  scriptContent: string
) {
  // In order to hydrate a React component it must be the first child element.
  // To guarantee this, we wrap it in an extra div and set it to
  // `display: contents` in order to not affect the styling.
  return createElement(
    "div",
    { "data-island-root": true, style: { display: "contents" } },
    createElement(Component, props),
    createElement("script", {
      ...scriptProps,
      dangerouslySetInnerHTML: { __html: scriptContent },
    })
  );
}
