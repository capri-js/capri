import { createIslandComponent, IslandOptions } from "capri";
import { ComponentType, h } from "preact";

export function island<T extends ComponentType<any>>(
  component: T,
  options: IslandOptions = {}
) {
  return createIslandComponent(
    component,
    options,
    ({ props, children, scriptProps, scriptContent }) => {
      const wrappedChildren =
        children && h("div", { "data-island-children": true }, children);

      return h(
        "div",
        { "data-island-root": true, style: { display: "contents" } },
        h(component, props, wrappedChildren),
        h("script", {
          ...scriptProps,
          dangerouslySetInnerHTML: { __html: scriptContent },
        })
      );
    }
  );
}
