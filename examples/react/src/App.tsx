import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { About } from "./About";
import { Home } from "./Home";
import "./App.css";

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
