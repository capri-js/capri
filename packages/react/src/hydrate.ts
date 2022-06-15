import { HydrationAdapter } from "capri/vite-plugin";
import { ComponentType, createElement } from "react";
import { hydrateRoot } from "react-dom/client";

const adapter: HydrationAdapter = {
  hydrate(component: ComponentType, props: object, element: Element) {
    return hydrateRoot(element.parentElement!, createElement(component, props));
  },

  renderRawHtml(attributes: object, html: string) {
    return createElement("div", {
      ...attributes,
      dangerouslySetInnerHTML: { __html: html },
    });
  },
};

export default adapter;
