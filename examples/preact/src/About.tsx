import { Suspense } from "preact/compat";

import { Digimon } from "./Digimon.jsx";
import { Link } from "./Link.jsx";

export function About() {
  return (
    <main>
      <h1>This page is static</h1>
      <p>
        Since it does not contain any interactive islands, no JavaScript is
        shipped to the browser!
      </p>
      <p>
        It does data though which is fetched from a remote API. Here is some
        text about a certain digimon:
      </p>
      <Suspense fallback="Loading...">
        <Digimon name="caprimon" />
      </Suspense>
      <Link href="/">Home</Link>
    </main>
  );
}
