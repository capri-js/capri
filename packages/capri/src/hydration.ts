import hydrationAdapter from "virtual:capri-hydration-adapter";

import { HydrationAdapter } from "./types.js";

function hydrateIslands({ hydrate, renderRawHtml }: HydrationAdapter) {
  const modules = import.meta.glob(import.meta.env.VITE_ISLAND_GLOB_PATTERN);
  const islands = document.querySelectorAll("script[data-island]");

  islands.forEach((node) => {
    const element = node.previousElementSibling;
    if (!element) throw new Error("Missing previousElementSibling");

    const dataIsland = node.getAttribute("data-island");
    if (!dataIsland) throw new Error("Missing attribute: data-island");

    const [id, key] = dataIsland.split("::");
    const load = modules[id];
    if (!load) throw new Error(`Module not found: ${id}`);

    const { props = {}, options = {} } = node.textContent
      ? JSON.parse(node.textContent)
      : {};

    const childContent = element.querySelector("[data-island-children]");
    if (childContent) {
      props.children = renderRawHtml(
        { "data-island-children": true },
        childContent.innerHTML
      );
    }

    const hydrateComponent = () => {
      load()
        .then((m) => {
          const Component = m[key];
          hydrate(Component, props, element);
        })
        .catch(console.error);
    };

    const { media } = options;
    if (media) {
      const mql = matchMedia(media);
      if (mql.matches) {
        hydrateComponent();
      } else {
        mql.addEventListener("change", hydrateComponent, { once: true });
      }
    } else {
      hydrateComponent();
    }
  });
}

hydrateIslands(hydrationAdapter);
