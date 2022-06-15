import { HydrationAdapter } from "capri/vite-plugin";
import { hydrate as solidHydrate } from "solid-js/web";

const adapter: HydrationAdapter = {
  hydrate(component, props, element) {
    const key = element.getAttribute("data-hk");
    if (!key) {
      throw new Error("Can't hydrate an element without a data-hk attribute.");
    }
    const renderId = key.slice(0, -1);
    solidHydrate(() => component(props), element.parentElement!, { renderId });
  },

  // Note: For SolidJS this is never called as the rendered children don't need
  // to be re-injected upon hydration.
  renderRawHtml(attributes, html) {
    return <div {...attributes} innerHTML={html} />;
  },
};

export default adapter;
