import "./main.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PreviewBanner } from "./Preview.jsx";
import { routes } from "./routes.jsx";

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

ReactDOM.createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <PreviewBanner />
    <RouterProvider router={router} />
  </StrictMode>
);
