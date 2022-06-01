import { useState } from "preact/hooks";
import { island } from "virtual:island";

export function Counter({ start = 0 }: { start?: number }) {
  const [counter, setCounter] = useState(start);
  return (
    <div class="counter" data-testid="counter">
      <button onClick={() => setCounter((c) => c - 1)}>-</button>
      {counter}
      <button onClick={() => setCounter((c) => c + 1)}>+</button>
    </div>
  );
}

export const CounterIsland = island(Counter);
