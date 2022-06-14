function findIsland(island: unknown) {
  const islands = import.meta.globEager(
    import.meta.env.VITE_ISLAND_GLOB_PATTERN
  );
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

export interface IslandOptions {
  media?: string;
}

type FragmentData = {
  props: object;
  children: any;
  scriptProps: object;
  scriptContent: string;
};

export function createIslandComponent<T>(
  component: T,
  options: IslandOptions = {},
  renderMarkerFragment: ({
    props,
    scriptProps,
    scriptContent,
  }: FragmentData) => any
) {
  const IslandComponent = ({ children, ...props }: any) => {
    const found = findIsland(component);
    if (!found) {
      throw new Error(
        `Island not found in ${import.meta.env.VITE_ISLAND_GLOB_PATTERN}`
      );
    }
    return renderMarkerFragment({
      props,
      children,
      scriptProps: {
        type: "application/json",
        "data-island": `${found.id}::${found.key}`,
      },
      scriptContent: JSON.stringify({ props, options }),
    });
  };
  IslandComponent.__island = component;
  return IslandComponent as any as T;
}