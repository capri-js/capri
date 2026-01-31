import { render } from "preact";

import { PreviewBanner } from "./components/ui/preview-banner.jsx";
import { Router } from "./router";

render(
  <>
    <PreviewBanner />
    <Router path={window.location.pathname} />
  </>,
  document.body,
);
