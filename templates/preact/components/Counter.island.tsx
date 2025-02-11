import { useState } from "preact/hooks";

import { Button } from "./Button.tsx";

type Props = {
  start?: number;
};

export default function Counter({ start = 0 }: Props) {
  const [counter, setCounter] = useState(start);
  return (
    <div class="flex items-center gap-2">
      <Button onClick={() => setCounter((c) => c - 1)}>-</Button>
      <span>{counter}</span>
      <Button onClick={() => setCounter((c) => c + 1)}>+</Button>
    </div>
  );
}
