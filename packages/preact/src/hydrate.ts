import { HydrationAdapter } from "capri/vite-plugin";
import { ComponentType, h, hydrate as hydrateComponent } from "preact";

const adapter: HydrationAdapter = {
  hydrate(component: ComponentType, props: object, element: Element) {
    return hydrateComponent(h(component, props), element.parentElement!);
  },

  renderRawHtml(attributes: object, html: string) {
    return h("div", {
      ...attributes,
      dangerouslySetInnerHTML: { __html: html },
    });
  },
};

export default adapter;
