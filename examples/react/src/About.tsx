import { Suspense } from "react";
import { Link } from "react-router-dom";

import { AsyncData } from "./AsyncData.jsx";

export function About() {
  return (
    <main>
      <h1>
        This page is completely static. Async data:{" "}
        <Suspense fallback={<span> loading...</span>}>
          <AsyncData />
        </Suspense>
      </h1>
      <section>
        An since it does not contain any interactive islands, no JavaScript is
        shipped to the browser.
      </section>
      <Link to="/">Home</Link>
    </main>
  );
}
