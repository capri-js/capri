import { island } from "@capri-js/solid";
import { createSignal } from "solid-js";

type Props = {
  title: string;
  children?: any;
};
function Expandable({ title, children }: Props) {
  const [expanded, setExpanded] = createSignal(false);
  return (
    <div class="expandable" data-expanded={expanded() ? "true" : "false"}>
      <button onClick={() => setExpanded((expanded) => !expanded)}>
        {title}
      </button>
      <div class="expandable-content">{children}</div>
    </div>
  );
}

export const ExpandableIsland = island(Expandable);
