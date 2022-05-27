import { hydrate } from "virtual:island-hydrate";

const modules = import.meta.glob("%ISLAND_GLOB_PATTERN%");
const islands = document.querySelectorAll("script[data-island]");

islands.forEach((node) => {
  const id = node.getAttribute("data-island");
  const key = node.getAttribute("data-key");
  if (!id || !key) throw new Error("Missing attribute");
  const load = modules[id];
  if (load) {
    load()
      .then((m) => {
        const Component = m[key];
        const props = node.textContent ? JSON.parse(node.textContent) : {};
        hydrate(Component, props, node.previousElementSibling!);
      })
      .catch(console.error);
  }
});
