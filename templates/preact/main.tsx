import "./main.css";

import { render } from "preact";

import { App } from "./App.tsx";

render(<App path={window.location.pathname} />, document.body);
