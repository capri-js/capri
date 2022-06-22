import { Link } from "react-router-dom";
import useSWR from "swr";

import CounterIsland from "./Counter.island.jsx";
import ExpandableIsland from "./Expandable.island.jsx";
import { ServerContent } from "./ServerContent";

const fetcher = (key: string) =>
  new Promise<string>((resolve) => {
    setTimeout(() => resolve(key), 0);
  });

export function Home() {
  const { data } = useSWR("This data has been fetched via SWR.", fetcher, {
    suspense: true,
  });
  return (
    <main>
      <h1>
        Partial hydration with React and <i>Capri</i>
      </h1>
      <section>This page is static, but contains some dynamic parts.</section>
      <section>{data}</section>
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
      <Link to="about">Link to another page</Link>
    </main>
  );
}
