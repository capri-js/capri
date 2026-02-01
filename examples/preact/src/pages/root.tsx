import CounterIsland from "../components/islands/counter.island";
import ExpandableIsland from "../components/islands/expandable.island";
import IdleIsland from "../components/islands/idle.island";
import IdleMediaIsland from "../components/islands/idle-media.island";
import MediaQueryIsland from "../components/islands/media-query.island";
import VisibleIsland from "../components/islands/visible.island";
import VisibleMediaIsland from "../components/islands/visible-media.island";
import { Link } from "../components/ui/link";
import { Paragraph } from "../components/ui/paragraph";

export default function Page() {
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
