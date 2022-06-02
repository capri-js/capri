import "./App.css";

// eslint-disable-next-line import/no-named-as-default
import Router from "@capri-js/preact-router";

import { About } from "./About";
import { Home } from "./Home";
import { Preview, PreviewBanner } from "./Preview";

type Props = {
  url?: string;
};

export function App({ url }: Props) {
  return (
    <div>
      {!url && <PreviewBanner />}
      <Router url={url}>
        <Home path="/" />
        <About path="/about" />
        <Preview path="/preview" />
      </Router>
    </div>
  );
}
