import { render } from "preact";

import { Router } from "./router.tsx";

render(<Router path={window.location.pathname} />, document.body);
