import { CounterIsland } from "./Counter.island";
import "./App.css";
import { createSignal } from "solid-js";

export function App() {
  const [name] = createSignal("Felix");
  return (
    <main>
      <h1>Hello {name}</h1>
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
    </main>
  );
}
