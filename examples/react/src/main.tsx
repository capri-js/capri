import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { PreviewBanner } from "./components/ui/preview-banner";
import { Router } from "./router";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <PreviewBanner />
    <Router path={window.location.pathname} />
  </StrictMode>,
);
