import { createIslandComponent, IslandOptions } from "capri";
import { ComponentType, h } from "preact";
import { lazy } from "preact-iso";

export type { RenderFunction } from "capri";
export { prerender as renderToString } from "preact-iso";

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
        h("capri-children", { style: { display: "contents" } }, children);

      return h(
        "capri-island",
        { style: { display: "contents" } },
        h(component, props, wrappedChildren),
        h("script", {
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
  const Comp = lazy(factory);
  return (props: any) => {
    return h(
      "capri-lagoon",
      { style: { display: "contents" } },
      h(Comp, props)
    );
  };
}
