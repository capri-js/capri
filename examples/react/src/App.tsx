import "./App.css";

import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { About } from "./About";
import { Home } from "./Home";
import { NotFound } from "./NotFound.jsx";
import { Preview } from "./Preview.jsx";

export function App() {
  return (
    <Suspense>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
