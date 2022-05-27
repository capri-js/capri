import { createSignal } from "solid-js";
import { island } from "virtual:island";

type Props = {
  start?: number;
};
export function Counter(props: Props) {
  const [counter, setCounter] = createSignal(props.start ?? 0);
  return (
    <div>
      <button onClick={() => setCounter((c) => c - 1)}>-</button>
      {counter()}
      <button onClick={() => setCounter((c) => c + 1)}>+</button>
    </div>
  );
}

export const CounterIsland = island(Counter);
