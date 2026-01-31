import { prerender } from "preact-iso";

import { Router } from "./router.tsx";

export async function render(url: string) {
  const result = await prerender(<Router path={url} />);
  return {
    body: result.html,
  };
}
