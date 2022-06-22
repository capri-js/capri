import { useState } from "preact/hooks";

export default function Counter({ start = 0 }: { start?: number }) {
  const [counter, setCounter] = useState(start);
  return (
    <div class="counter" data-testid="counter">
      <button onClick={() => setCounter((c) => c - 1)}>-</button>
      <span>{counter}</span>
      <button onClick={() => setCounter((c) => c + 1)}>+</button>
    </div>
  );
}
