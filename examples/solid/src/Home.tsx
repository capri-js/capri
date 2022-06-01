import { Link } from "solid-app-router";

import { CounterIsland } from "./Counter.island";

export function Home() {
  return (
    <main>
      <h1>
        Welcome to <i>Capri</i>
      </h1>
      <p>This page is static, but contains some dynamic parts.</p>
      <p>
        Here is a simple counter: <CounterIsland />
      </p>
      <p>
        And here is another one, independent from the one above:
        <CounterIsland start={100} />
      </p>
      <Link href="/about">Link to another page</Link>
    </main>
  );
}
