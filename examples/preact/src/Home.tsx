import { Link } from "wouter-preact";

import CombinedStrategiesIsland from "./CombinedStrategies.island.jsx";
import CounterIsland from "./Counter.island.jsx";
import ExpandableIsland from "./Expandable.island.jsx";
import LazyLoadIsland from "./LazyLoad.island.jsx";
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

      <div style={{ marginTop: "2rem" }}>
        <h2>Lazy Loading Examples</h2>
        <div style={{ height: "100vh" }}>
          <p>⬇️ Scroll down to see lazy-loaded islands ⬇️</p>
        </div>
        <LazyLoadIsland strategy="visible" />
        <LazyLoadIsland strategy="idle" />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Combined Strategies Examples</h2>
        <p>These islands only hydrate on screens narrower than 1000px:</p>
        <div style={{ height: "100vh" }}>
          <p>⬇️ Scroll down and resize your browser ⬇️</p>
        </div>
        <CombinedStrategiesIsland strategy="visible" />
        <CombinedStrategiesIsland strategy="idle" />
      </div>

      <Link to="/about">Link to another page</Link>
    </main>
  );
}
