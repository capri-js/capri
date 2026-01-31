import { Digimon } from "../components/async/digimon.tsx";

export default function Page() {
  return (
    <main className="max-w-prose mx-auto my-8 space-y-2">
      <h1 className="text-2xl font-bold">No JavaScript on this page</h1>
      <p>
        This page does not contain any interactive islands. Therefore no
        JavaScript is shipped to the browser!
      </p>
      <p>
        It does contain data though which was fetched from a remote API during
        build:
      </p>
      <Digimon name="caprimon" />
      <a href="/" className="underline">
        Home
      </a>
    </main>
  );
}
