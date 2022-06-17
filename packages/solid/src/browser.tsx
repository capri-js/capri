import { Component } from "solid-js";

export function island<T extends Component<any>>(component: T, options = {}) {
  // In the browser this island function is a no-op and returns the passed
  // component verbatim.
  return component;
}

export function lagoon<T extends Component<any>>(
  factory: () => Promise<{ default: T }>
) {
  return (props: any) => {
    return <capri-lagoon innerHTML="" />;
  };
}
