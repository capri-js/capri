import "./App.css";

import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { About } from "./About";
import { Home } from "./Home";

export function App() {
  return (
    <Suspense>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
