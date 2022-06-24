const promises = new Map();
const response = new Map();

const mockData: Record<string, string> = {
  "/data": "loaded!",
};

function mockFetch(url: string) {
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve(mockData[url]), 500)
  );
}

export function useFetch(url: string) {
  // Ideally we would use useRef here instead of a map. Unfortunately Preact
  // clears the hook state when a promise is thrown.
  const data = response.get(url);
  if (data) return data;
  let promise = promises.get(url);
  if (!promise) {
    promise = mockFetch(url).then((res) => response.set(url, res));
    promises.set(url, promise);
  }
  throw promise;
}
