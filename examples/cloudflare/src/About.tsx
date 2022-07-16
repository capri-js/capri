import { Link } from "react-router-dom";

export function About() {
  return (
    <main>
      <h1>This page was server-rendered on {new Date().toLocaleString()}</h1>
      <section>
        An since it does not contain any interactive islands, no JavaScript is
        shipped to the browser.
      </section>
      <Link to="/">Home</Link>
    </main>
  );
}
