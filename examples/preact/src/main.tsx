import { createHashHistory } from "history";
import { render } from "preact";

import { App } from "./App";

render(<App history={createHashHistory()} />, document.body);
