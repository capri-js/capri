import { CounterIsland } from "./Counter.island";
import useSWR from "swr";
import { Link } from "react-router-dom";

import "./App.css";

const fetcher = () =>
  new Promise<string>((resolve) => {
    setTimeout(() => resolve("Data fetched via SWR!"), 0);
  });

export function Home() {
  //const { data } = useSWR("dummy", fetcher, { suspense: true });
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
      <Link to="/about">Link to another page</Link>
    </main>
  );
}
