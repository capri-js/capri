import { renderMarkerFragment } from "virtual:island-renderMarkerFragment";
const islands = import.meta.globEager("%ISLAND_GLOB_PATTERN%");

function findIsland(island: unknown) {
  for (const [id, module] of Object.entries(islands)) {
    for (const [key, member] of Object.entries(module)) {
      if (
        typeof member === "function" &&
        "__island" in member &&
        member.__island === island
      )
        return { id, key };
    }
  }
}

export function island<T>(component: T) {
  const IslandComponent = (props: any) => {
    const found = findIsland(component);
    if (!found) {
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
  IslandComponent.__island = component;
  return IslandComponent;
}
