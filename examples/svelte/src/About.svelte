<script>
  import { Link } from "svelte-navigator";
</script>

<main>
  <h1>This page is completely static.</h1>
  <section>
    An since it does not contain any interactive islands, no JavaScript is
    shipped to the browser.
  </section>
  <Link to="..">Home</Link>
</main>
