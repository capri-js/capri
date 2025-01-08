import { ComponentChildren } from "preact";
import { useState } from "preact/hooks";

type Props = {
  title: string;
  children?: ComponentChildren;
};
export default function Expandable({ title, children }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div class="expandable box" data-expanded={expanded ? "true" : "false"}>
      <button onClick={() => setExpanded(!expanded)}>{title}</button>
      <div class="expandable-content">
        {children}
      </div>
    </div>
  );
}
