import "./main.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App.tsx";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>,
);
