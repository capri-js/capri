export function island<T>(component: T, options = {}) {
  // In the browser this island function is a no-op and returns the passed
  // component verbatim.
  return component;
}
