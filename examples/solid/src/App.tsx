import "./App.css";

import { Route, Routes } from "solid-app-router";

import { About } from "./About";
import { Home } from "./Home";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
