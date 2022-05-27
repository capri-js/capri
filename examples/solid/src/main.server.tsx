import { generateHydrationScript, renderToStringAsync } from "solid-js/web";
import { App } from "./App";

export async function render(url: string) {
  const html = await renderToStringAsync(() => <App />);
  return html + generateHydrationScript();
}
