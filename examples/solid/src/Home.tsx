import { CounterIsland } from "./Counter.island";

export function Home() {
  return (
    <main>
      <h1>
        Partial hydration with <i>Capri</i>
      </h1>
      <section>
        This page is static, but contains some dynamic parts. It was generated
        upon build time using <a href="https://www.solidjs.com/">SolidJS</a> and{" "}
        <a href="https://capri.build">Capri</a>.
      </section>
      <section>
        This counter is an interactive island: <CounterIsland />
      </section>
      <section>
        And here is another one, independent from the one above:{" "}
        <CounterIsland start={100} />
      </section>
      <a href="about">Link to another page</a>
    </main>
  );
}
