const promises = new Map();
const results = new Map();

export function useFetch<T>(url: string): T {
  const data = results.get(url);
  if (data) return data;
  let promise = promises.get(url);
  if (!promise) {
    promise = fetch(url).then((res) =>
      res.json().then((json) => results.set(url, json)),
    );
    promises.set(url, promise);
  }
  throw promise;
}
