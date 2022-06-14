import "./App.css";

import { Route, Routes } from "solid-app-router";
import { NoHydration } from "solid-js/web";

import { About } from "./About";
import { Home } from "./Home";

export function App() {
  return (
    <NoHydration>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </NoHydration>
  );
}
