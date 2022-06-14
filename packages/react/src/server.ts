import { createIslandComponent, IslandOptions } from "capri";
import { ComponentType, createElement } from "react";

export function island<T extends ComponentType<any>>(
  component: T,
  options: IslandOptions = {}
) {
  return createIslandComponent(
    component,
    options,
    ({ props, children, scriptProps, scriptContent }) => {
      const wrappedChildren =
        children &&
        createElement("div", { "data-island-children": true }, children);

      return createElement(
        "div",
        { "data-island-root": true, style: { display: "contents" } },
        createElement(component, props, wrappedChildren),
        createElement("script", {
          ...scriptProps,
          dangerouslySetInnerHTML: { __html: scriptContent },
        })
      );
    }
  );
}
