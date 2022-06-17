import { ComponentType, h } from "preact";

export function island<T extends ComponentType<any>>(
  component: T,
  options = {}
) {
  // In the browser this island function is a no-op and returns the passed
  // component verbatim.
  return component;
}

export function lagoon<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return (props: any) => {
    return h("capri-lagoon", {
      dangerouslySetInnerHTML: { __html: "" },
    });
  };
}
