import { sharedConfig } from "solid-js";
import { NoHydration } from "solid-js/web";
import * as componentModule from "virtual:capri-component";
const { default: Component, options } = componentModule;

export function Hydration(props) {
  const c = sharedConfig.context;
  c.noHydrate = false;
  const children = props.children;
  c.noHydrate = true;
  return children;
}

export default function ComponentIsland({ children, ...props }) {
  const wrappedChildren = children && <NoHydration>{children}</NoHydration>;

  return (
    <capri-island style="display: contents">
      <Hydration>
        <Component {...props}>{wrappedChildren}</Component>
      </Hydration>
      <script
        type="application/json"
        data-island="%COMPONENT_ID%"
        innerHTML={JSON.stringify({ props, options })}
      />
    </capri-island>
  );
}
