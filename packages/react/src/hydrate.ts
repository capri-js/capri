import { HydrationAdapter } from "capri/vite-plugin";
import { ComponentType, createElement } from "react";
import { hydrateRoot } from "react-dom/client";

const adapter: HydrationAdapter = {
  hydrate(component: ComponentType, props: object, element: Element) {
    return hydrateRoot(element.parentElement!, createElement(component, props));
  },

  renderChildren() {
    return createElement("capri-children", {
      style: { display: "contents" },
      dangerouslySetInnerHTML: { __html: "" },
    });
  },
};

export default adapter;
