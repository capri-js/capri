import { create_ssr_component } from "svelte/internal";
import component from "virtual:capri-component";

export default create_ssr_component((result, props, bindings, slots) => {
  const html = component.$$render(result, props, bindings, slots);
  return `<capri-lagoon style="display:contents">${html}</capri-lagoon>`;
});
