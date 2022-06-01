import { Link } from "@capri-js/preact-router";

import { CounterIsland } from "./Counter.island";

export function Home() {
  return (
    <main>
      <h1>
        Welcome to <i>Capri</i>
      </h1>
      <section>This page is static, but contains some dynamic parts.</section>
      <section>
        Here is a simple counter: <CounterIsland />
      </section>
      <section>
        And here is another one, independent from the one above:{" "}
        <CounterIsland start={100} />
      </section>
      <Link href="/about">Link to another page</Link>
    </main>
  );
}
