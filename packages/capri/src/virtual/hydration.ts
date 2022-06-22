import hydrate from "virtual:capri-hydrate";

function hydrateIslands() {
  const modules = import.meta.glob("%ISLAND_GLOB_PATTERN%");
  const islands = document.querySelectorAll("script[data-island]");

  islands.forEach((node) => {
    const element = node.previousElementSibling;
    if (!element) throw new Error("Missing previousElementSibling");

    const island = node.getAttribute("data-island");
    if (!island) throw new Error("Missing attribute: data-island");

    const load = modules[island];
    if (!load) throw new Error(`Module not found: ${island}`);

    const { props = {}, options = {} } = node.textContent
      ? JSON.parse(node.textContent)
      : {};

    const hydrateComponent = () => {
      load()
        .then((m) => {
          hydrate(m.default, props, element);
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

hydrateIslands();
