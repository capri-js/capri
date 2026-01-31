import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { PreviewBanner } from "./components/ui/preview-banner.jsx";
import { Router } from "./router.jsx";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <PreviewBanner />
    <Router path={window.location.pathname} />
  </StrictMode>,
);
