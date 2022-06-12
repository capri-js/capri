import { Link } from "react-router-dom";
import useSWR from "swr";

import { CounterIsland } from "./Counter.island";

const fetcher = () =>
  new Promise<string>((resolve) => {
    setTimeout(() => resolve("Data fetched via SWR!"), 0);
  });

export function Home() {
  const { data } = useSWR("This data has been fetched via SWR.", fetcher, {
    suspense: true,
  });
  return (
    <main>
      <h1>
        Partial hydration with <i>Capri</i>
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
      <Link to="about">Link to another page</Link>
    </main>
  );
}
