import { island } from "@capri-js/react";
import { ReactNode, useState } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};
function Expandable({ title, children }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="expandable" data-expanded={expanded ? "true" : "false"}>
      <button onClick={() => setExpanded(!expanded)}>{title}</button>
      <div className="expandable-content">{children}</div>
    </div>
  );
}

export const ExpandableIsland = island(Expandable);
