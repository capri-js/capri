import { render } from "preact";

import { Router } from "./router";
import { PreviewBanner } from "./components/ui/preview-banner.jsx";

render(
  <>
    <PreviewBanner />
    <Router path={window.location.pathname} />
  </>,
  document.body,
);
