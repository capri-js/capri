import CounterIsland from "../components/islands/counter.island.tsx";

export default function Page() {
  return (
    <main class="max-w-prose mx-auto my-8 space-y-2">
      <h1 class="text-2xl font-bold">
        Partial hydration with Preact and Capri 🍋
      </h1>
      <p>This page is static, but contains some dynamic parts.</p>
      <p>Here is a simple counter:</p>
      <CounterIsland />
      <a href="/zero-js" class="underline">
        Link to another page
      </a>
    </main>
  );
}
