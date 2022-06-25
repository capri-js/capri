import { sharedConfig } from "solid-js";
import * as componentModule from "virtual:capri-component";
const { default: Component, options } = componentModule;

/**
 * Like Solid's NoHydration, but instead of setting noHydrate
 * to true after rendering the children, we restore its previous value.
 */
export function NoHydration(props) {
  const c = sharedConfig.context;
  const prev = c.noHydrate;
  c.noHydrate = false;
  const children = props.children;
  c.noHydrate = prev;
  return children;
}

export function Hydration(props) {
  const c = sharedConfig.context;
  const prev = c.noHydrate;
  c.noHydrate = false;
  const children = props.children;
  c.noHydrate = prev;
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
