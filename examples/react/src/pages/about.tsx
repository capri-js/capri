import { Digimon } from "../components/async/digimon.jsx";
import { Link } from "../components/ui/link.jsx";

export default function Page() {
  return (
    <main>
      <h1>This page is static</h1>
      <p>
        Since it does not contain any interactive islands, no JavaScript is
        shipped to the browser!
      </p>
      <p>
        It does data though which is fetched from a remote API. Here is some
        text about a certain digimon:
      </p>
      <Digimon name="caprimon" />
      <Link href="/">Home</Link>
    </main>
  );
}
