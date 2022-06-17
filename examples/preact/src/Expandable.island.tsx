import { island, lagoon } from "@capri-js/preact";
import { ComponentChildren } from "preact";
import { useState } from "preact/hooks";

const StaticContent = lagoon(() => import("./StaticContent.jsx"));

type Props = {
  title: string;
  children?: ComponentChildren;
};
function Expandable({ title, children }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div class="expandable box" data-expanded={expanded ? "true" : "false"}>
      <StaticContent>
        This is static content inside an island. We call this a lagoon.
      </StaticContent>
      <button onClick={() => setExpanded(!expanded)}>{title}</button>
      <div class="expandable-content">
        <StaticContent>
          This a second lagoon. Below you see the children that were passed to
          the Expandable island:
        </StaticContent>
        {children}
      </div>
    </div>
  );
}

export const ExpandableIsland = island(Expandable);
