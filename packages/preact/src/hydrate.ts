import { HydrationAdapter } from "capri/vite-plugin";
import { ComponentType, h, hydrate as hydrateComponent } from "preact";

const adapter: HydrationAdapter = {
  hydrate(component: ComponentType, props: object, element: Element) {
    return hydrateComponent(h(component, props), element.parentElement!);
  },

  renderChildren() {
    return h("capri-children", {
      style: { display: "contents" },
      dangerouslySetInnerHTML: { __html: "" },
    });
  },
};

export default adapter;
