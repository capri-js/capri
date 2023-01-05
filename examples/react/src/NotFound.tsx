import { useStatus } from "@capri-js/react/server";

export function NotFound() {
  useStatus(404);
  return (
    <main>
      <h1>404 - Not found.</h1>
    </main>
  );
}
