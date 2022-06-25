import { Router } from "solid-app-router";
import { render } from "solid-js/web";

import { App } from "./App";

render(
  () => (
    <Router base={import.meta.env.BASE_URL}>
      <App />
    </Router>
  ),
  document.getElementById("app")!
);
