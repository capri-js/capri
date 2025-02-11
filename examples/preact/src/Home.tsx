import CounterIsland from "./Counter.island.jsx";
import ExpandableIsland from "./Expandable.island.jsx";
import IdleIsland from "./Idle.island.jsx";
import IdleMediaIsland from "./IdleMedia.island.jsx";
import { Link } from "./Link.jsx";
import MediaQueryIsland from "./MediaQuery.island.jsx";
import { Paragraph } from "./Paragraph.jsx";
import VisibleIsland from "./Visible.island.jsx";
import VisibleMediaIsland from "./VisibleMedia.island.jsx";

export function Home() {
  return (
    <main>
      <h1>Partial hydration with Preact and Capri 🍋</h1>
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
        <Paragraph>
          Hence the code for the <code>Paragraph</code> component won't show up
          in the client bundle.
        </Paragraph>
      </ExpandableIsland>
      <MediaQueryIsland />

      <div style={{ marginTop: "2rem" }}>
        <h2>Lazy Loading Examples</h2>
        <div style={{ height: "100vh" }}>
          <p>⬇️ Scroll down to see lazy-loaded islands ⬇️</p>
        </div>
        <VisibleIsland />
        <IdleIsland />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Combined Strategies Examples</h2>
        <p>These islands only hydrate on screens narrower than 1000px:</p>
        <div style={{ height: "100vh" }}>
          <p>⬇️ Scroll down and resize your browser ⬇️</p>
        </div>
        <VisibleMediaIsland />
        <IdleMediaIsland />
      </div>
      <Link href="/about">Link to another page</Link>
    </main>
  );
}
