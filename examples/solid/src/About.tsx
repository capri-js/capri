import { Link } from "solid-app-router";

export function About() {
  return (
    <main>
      <h1>This page is completely static.</h1>
      <p>
        An since it does not contain any interactive islands, no JavaScript is
        shipped to the browser.
      </p>
      <Link href="/">Home</Link>
    </main>
  );
}
