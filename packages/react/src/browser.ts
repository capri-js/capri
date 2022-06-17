import { ComponentType, createElement } from "react";

export function island<T extends ComponentType<any>>(
  component: T,
  options = {}
) {
  // In the browser this island function is a no-op
  return component;
}

export function lagoon<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return (props: any) => {
    return createElement("capri-lagoon", {
      dangerouslySetInnerHTML: { __html: "" },
    });
  };
}
