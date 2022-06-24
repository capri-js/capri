import "./App.css";

import { Route } from "wouter-preact";

import { About } from "./About";
import { Home } from "./Home";
import { Preview } from "./Preview";

export function App() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/preview" component={Preview} />
    </>
  );
}
