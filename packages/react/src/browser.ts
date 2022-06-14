import { IslandOptions } from "capri";
import { ComponentType } from "react";

export function island<T extends ComponentType<any>>(
  component: T,
  options: IslandOptions = {}
) {
  // In the browser this island function is a no-op and returns the passed
  // component verbatim.
  return component;
}
