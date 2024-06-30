import { RouteObject } from "react-router-dom";

import { About } from "./About.jsx";
import { Home } from "./Home.jsx";
import { Preview } from "./Preview.jsx";

export const routes: RouteObject[] = [
  { path: "/", index: true, element: <Home /> },
  {
    path: "/about",
    element: <About />,
    loader: () =>
      new Promise((resolve) => {
        setTimeout(() => resolve("Loaded."), 250);
      }),
  },
  { path: "/preview", element: <Preview /> },
];
