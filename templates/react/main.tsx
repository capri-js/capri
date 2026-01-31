import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { Router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <Router path={window.location.pathname} />
  </StrictMode>,
);
