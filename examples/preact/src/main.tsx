import { render } from "preact";
import { createHashHistory } from "history";
import { App } from "./App";

render(<App history={createHashHistory()} />, document.body);
