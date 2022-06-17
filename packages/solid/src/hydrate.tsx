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

  renderChildren() {
    return <capri-children style={{ display: "contents" }} innerHTML="" />;
  },
};

export default adapter;
