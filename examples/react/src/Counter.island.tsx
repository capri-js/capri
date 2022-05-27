import { useState } from "react";
import { island } from "virtual:island";

type Props = {
  start?: number;
};

export function Counter({ start = 0 }: Props) {
  const [counter, setCounter] = useState(start);
  return (
    <div>
      <button onClick={() => setCounter((c) => c - 1)}>-</button>
      {counter}
      <button onClick={() => setCounter((c) => c + 1)}>+</button>
    </div>
  );
}

export const CounterIsland = island(Counter);
