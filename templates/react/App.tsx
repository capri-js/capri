import { About } from "./pages/About.tsx";
import { Home } from "./pages/Home.tsx";

export function App({ path }: { path: string }) {
  if (path === "/") {
    return <Home />;
  } else if (path === "/about") {
    return <About />;
  } else {
    throw new Error("Not found");
  }
}
