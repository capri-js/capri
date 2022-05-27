import { Suspense } from "react";
import { CounterIsland } from "./Counter.island";
import useSWR from "swr";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";

const fetcher = () =>
  new Promise<string>((resolve) => {
    setTimeout(() => resolve("Data fetched via SWR!"), 0);
  });

function Home() {
  const { data } = useSWR("dummy", fetcher, { suspense: true });
  return (
    <main>
      <h1>{data}</h1>
      <ul>
        <li>This page is static</li>
        <li>with some dynamic parts</li>
        <li>
          <CounterIsland />
        </li>
        <li>
          <CounterIsland start={100} />
        </li>
      </ul>
      <Link to="/foo">Foo</Link>
    </main>
  );
}

function Foo() {
  return (
    <main>
      <h1>Foo</h1>
      <p>
        <Link to="/">Home</Link>
      </p>
    </main>
  );
}

export function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/foo" element={<Foo />} />
      </Routes>
    </Suspense>
  );
}
