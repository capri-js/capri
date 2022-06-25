import { Link } from "solid-app-router";
import { Suspense } from "solid-js";

import { AsyncData } from "./AsyncData.jsx";

export function About() {
  return (
    <main>
      <h1>
        This page is completely static. Async data:
        <Suspense fallback={<span> loading...</span>}>
          <AsyncData />
        </Suspense>
      </h1>
      <section>
        An since it does not contain any interactive islands, no JavaScript is
        shipped to the browser.
      </section>
      <Link href="/">Home</Link>
    </main>
  );
}
