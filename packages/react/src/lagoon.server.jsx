import Component from "virtual:capri-component";

export default function Lagoon(props) {
  return (
    <capri-lagoon style={{ display: "contents" }}>
      <Component {...props} />
    </capri-lagoon>
  );
}
