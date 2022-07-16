export async function polyfillWebAPIs() {
  if (!globalThis.ReadableStream) {
    await import("web-streams-polyfill");
  }

  if (!globalThis.fetch) {
    const fetch: any = await import("node-fetch");
    globalThis.fetch = fetch.default;
    globalThis.Request = fetch.Request;
    globalThis.Response = fetch.Response;
    globalThis.Headers = fetch.Headers;
  }
}
