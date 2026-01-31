import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { Router } from "./router.jsx";
import { PreviewBanner } from "./components/ui/preview-banner.jsx";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <PreviewBanner />
    <Router path={window.location.pathname} />
  </StrictMode>,
);
