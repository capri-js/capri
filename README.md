# ![Capri](logo.svg)

Capri is a site generator for React/Preact.

Capri supports two different rendering modes: one is optimized for speed and minimal page weight,
whereas the other one is optimized for visual editing and live previews inside your CMS.

For regular visitors, Capri sites work much like Astro pages, where only the interactive parts (islands) get hydrated.
For the static parts, no JavaScript needs to be shipped to the client, resulting in very fast load times.

For editors on the other hand, Capri pages can also be rendered as single page apps, providing a snappy user experience when combined with a CMS that supports visual editing like TinaCMS, Sanity or Storyblok.

## TODO

- Simple create-capri implementation based on degit, ora and prompts
- Migrate from multi-semantic-release to zx-bulk-release
- https://github.com/slorber/trailing-slash-guide

# License

MIT
