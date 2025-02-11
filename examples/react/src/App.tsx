import { About } from "./About";
import { Home } from "./Home";
import { Preview } from "./Preview";

export function App({ path }: { path: string }) {
  const base = process.env.BASE_URL || "/";
  if (path.startsWith(base)) {
    path = path.slice(base.length);
  }
  if (path === "") {
    return <Home />;
  } else if (path === "about") {
    return <About />;
  } else if (path === "preview") {
    return <Preview />;
  } else {
    throw new Error("Not found");
  }
}
