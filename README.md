# ![Capri](logo.svg)

Capri is a site generator for React/Preact.

Capri supports two different rendering modes: one is optimized for speed and minimal page weight,
whereas the other one is optimized for visual editing and live previews inside your CMS.

For regular visitors, Capri sites work much like Astro pages, where only the interactive parts (islands) get hydrated.
One big difference though: Other then Astro, Capri does not come with its own component format, it uses regular React/Preact components also for the static parts. Since these get rendered during build time, no JavaScript needs to be shipped to the client, resulting in very fast load times.

For editors on the other hand, Capri pages can also be rendered as single page apps, providing a snappy user experience when combined with a CMS that supports visual editing like TinaCMS, Sanity or Storyblok.

# Support for other frameworks and SSR

Up until version 5 Capri also supported Vue, Solid and Svelte and provided adapters to support server side rendering on various cloud platforms. While this was an interesting proof of concept, maintaining all of this and keeping up with the rapid changes was nearly impossible. Capri v6 now focuses on static site generation with React/Preact which I think fills an interesting gap in the current web ecosystem and brings backs a lot of the simplicty which modern frameworks often lack.

# License

MIT
