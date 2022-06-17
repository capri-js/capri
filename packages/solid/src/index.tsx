import { createIslandComponent, IslandOptions } from "capri";
import { Component, ComponentProps, lazy, sharedConfig } from "solid-js";
import { NoHydration } from "solid-js/web";

import plugin from "./vite-plugin.js";

export default plugin;

export function Hydration(props: any) {
  const c: any = sharedConfig.context;
  c.noHydrate = false;
  const children = props.children;
  c.noHydrate = true;
  return children;
}
export type { RenderFunction } from "capri";

export function island<T extends (props: any) => any>(
  Component: T,
  options: IslandOptions = {}
) {
  return createIslandComponent(
    Component,
    options,
    ({ props, children, scriptProps, scriptContent }) => {
      const wrappedChildren = children && <NoHydration>{children}</NoHydration>;

      return (
        <capri-island style="display: contents">
          <Hydration>
            <Component {...props}>{wrappedChildren}</Component>
          </Hydration>
          <script {...scriptProps} innerHTML={scriptContent} />
        </capri-island>
      );
    }
  );
}

export function lagoon<T extends Component<any>>(
  factory: () => Promise<{ default: T }>
) {
  const Comp = lazy(factory);
  return (props: ComponentProps<T>) => {
    return (
      <capri-lagoon style={{ display: "contents" }}>
        <Comp {...props} />
      </capri-lagoon>
    );
  };
}
