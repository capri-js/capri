import { use } from "react";

const promises = new Map();

export function fetchJson(url: string) {
  let promise = promises.get(url);
  if (!promise) {
    promise = fetch(url).then((res) => res.json());
    promises.set(url, promise);
  }
  return promise;
}

export function useFetch<T>(url: string): T {
  return use(fetchJson(url));
}
