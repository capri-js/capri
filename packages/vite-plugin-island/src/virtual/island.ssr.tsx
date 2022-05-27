import { renderMarkerFragment } from "virtual:island-renderMarkerFragment";
const islands = import.meta.globEager("%ISLAND_GLOB_PATTERN%");

function findIsland(island: unknown) {
  for (let [id, module] of Object.entries(islands)) {
    for (let [key, member] of Object.entries(module)) {
      if (member === island) return { id, key };
    }
  }
}

export function island<T>(component: T) {
  return (props: any) => {
    const found = findIsland(component);
    if (!found) {
      //TODO Add hint to export both island and raw component!
      throw new Error("Island not found in %ISLAND_GLOB_PATTERN%");
    }
    return renderMarkerFragment(
      component,
      props,
      {
        type: "application/json",
        "data-island": found.id,
        "data-key": found.key,
      },
      JSON.stringify(props)
    );
  };
}
