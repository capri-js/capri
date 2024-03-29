import { Link } from "wouter-preact";

import CounterIsland from "./Counter.island.jsx";
import ExpandableIsland from "./Expandable.island.jsx";
import MediaQueryIsland from "./MediaQuery.island.jsx";
import { ServerContent } from "./ServerContent.jsx";

export function Home() {
  return (
    <main>
      <h1>
        Partial hydration with Preact and <i>Capri</i>
      </h1>
      <section>This page is static, but contains some dynamic parts.</section>
      <section>
        Here is a simple counter: <CounterIsland />
      </section>
      <section>
        And here is another one, independent from the one above:{" "}
        <CounterIsland start={100} />
      </section>
      <ExpandableIsland title="Click to expand">
        This island receives children as prop. They are only rendered upon build
        time.
        <ServerContent>
          The code for <code>ServerContent</code> won't show up in the client
          bundle.
        </ServerContent>
      </ExpandableIsland>
      <MediaQueryIsland />
      <Link href="/about">
        <a>Link to another page</a>
      </Link>
    </main>
  );
}
