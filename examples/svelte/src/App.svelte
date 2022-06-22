<script>
  import { Router, Route } from "svelte-navigator";
  import Home from "./Home.svelte";
  import About from "./About.svelte";
  import "./global.css";
  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";
</script>

<Router {url}>
  <Route path="/" component={Home} />
  <Route path="about" component={About} />
</Router>
