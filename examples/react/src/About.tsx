import { Link } from "react-router-dom";

export function About() {
  return (
    <main>
      <h1>This page is completely static.</h1>
      <section>
        An since it does not contain any interactive islands, no JavaScript is
        shipped to the browser.
      </section>
      <Link to="/">Home</Link>
    </main>
  );
}
