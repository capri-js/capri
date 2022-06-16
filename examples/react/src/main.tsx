import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { PreviewBanner } from "./Preview.jsx";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <BrowserRouter>
      <PreviewBanner />
      <App />
    </BrowserRouter>
  </StrictMode>
);
