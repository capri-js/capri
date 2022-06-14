import { IslandOptions } from "capri";

export function island<T>(component: T, options: IslandOptions = {}) {
  // In the browser this island function is a no-op and returns the passed
  // component verbatim.
  return component;
}
