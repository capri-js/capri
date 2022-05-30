import "./App.css";

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
        Welcome to <i>Capri</i>
      </h1>
      <p>This page is static, but contains some dynamic parts.</p>
      <p>{data}</p>
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
