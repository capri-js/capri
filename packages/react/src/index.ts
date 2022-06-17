import { createIslandComponent, IslandOptions } from "capri";
import React, { ComponentType, createElement } from "react";

export type { RenderFunction } from "capri";

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
        createElement(
          "capri-children",
          { style: { display: "contents" } },
          children
        );

      return createElement(
        "capri-island",
        { style: { display: "contents" } },
        createElement(component, props, wrappedChildren),
        createElement("script", {
          ...scriptProps,
          dangerouslySetInnerHTML: { __html: scriptContent },
        })
      );
    }
  );
}

export function lagoon<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  const Comp = React.lazy(factory);
  return (props: any) => {
    return createElement(
      "capri-lagoon",
      { style: { display: "contents" } },
      createElement(Comp, props)
    );
  };
}
