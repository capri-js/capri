import { create_ssr_component } from "svelte/internal";
import * as componentModule from "virtual:capri-component";

const { default: component, options = {} } = componentModule;

export default create_ssr_component((result, props, bindings, slots) => {
  const wrappedSlots = Object.fromEntries(
    Object.entries(slots).map(([name, fn]) => [
      name,
      () =>
        `<capri-slot style="display:contents" name="${name}">${fn()}</capri-slot>`,
    ])
  );
  const html = component.$$render(result, props, bindings, wrappedSlots);
  return `<capri-island>
      ${html}
      <script type="application/json" data-island="%COMPONENT_ID%">
      ${JSON.stringify({ props, options })}
      </script>
    </capri-island>`;
});
