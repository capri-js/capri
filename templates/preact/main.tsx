import { render } from "preact";

import { Router } from "./router";

render(<Router path={window.location.pathname} />, document.body);
