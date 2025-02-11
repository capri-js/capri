import { render } from "preact";

import { App } from "./App";
import { PreviewBanner } from "./Preview.jsx";

render(
  <>
    <PreviewBanner />
    <App path={window.location.pathname} />
  </>,
  document.body,
);
