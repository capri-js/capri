const promises = new Map();
const response = new Map();

const mockData: Record<string, string> = {
  "/data": "loaded!",
};

function mockFetch(url: string) {
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve(mockData[url]), 100)
  );
}

export function useFetch(url: string) {
  const data = response.get(url);
  if (data) return data;
  let promise = promises.get(url);
  if (!promise) {
    promise = mockFetch(url).then((res) => response.set(url, res));
    promises.set(url, promise);
  }
  throw promise;
}
