import { Suspense } from "preact/compat";

import { Digimon } from "../components/Digimon.tsx";

export function About() {
  return (
    <main class="max-w-prose mx-auto my-8 space-y-2">
      <h1 class="text-2xl font-bold">No JavaScript on this page</h1>
      <p>
        This page does not contain any interactive islands. Therefore no
        JavaScript is shipped to the browser!
      </p>
      <p>
        It does contain data though which was fetched from a remote API during
        build:
      </p>
      <Suspense fallback="Loading...">
        <Digimon name="caprimon" />
      </Suspense>
      <a href="/" class="underline">
        Home
      </a>
    </main>
  );
}
