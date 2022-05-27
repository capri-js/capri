import Router from "preact-router";
import { CounterIsland } from "./Counter.island";
import "./App.css";

export function App({ url, history }: { url?: string; history?: any }) {
  return (
    <Router url={url} history={history}>
      <Home path="/" />
      <Foo path="/foo" />
    </Router>
  );
}

function Home() {
  return (
    <main>
      <h1>TODO</h1>
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
      <a href="/foo">Foo</a>
    </main>
  );
}

function Foo() {
  return (
    <main>
      <h1>Foo</h1>
      <p>
        <a href="/">Home</a>
      </p>
    </main>
  );
}
