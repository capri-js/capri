import { CounterIsland } from "./Counter.island";
import { ExpandableIsland } from "./Expandable.island.jsx";
import { Link } from "./Link.jsx";
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
        This is a layout island. Its children are only rendered upon build time.
        When hydrated, a static component is passed as only child which will
        render the original HTML subtree.
        <ServerContent>
          The code for <code>ServerContent</code> should not show up in the
          client bundle.
        </ServerContent>
      </ExpandableIsland>
      <Link href="about">Link to another page</Link>
    </main>
  );
}
