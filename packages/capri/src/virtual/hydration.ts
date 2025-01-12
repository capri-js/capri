/**
 * Entry script to hydrate all the islands.
 */

// Find all modules that match the island glob pattern.
// NOTE: The ISLAND_GLOB_PATTERN token below is replaced by the
// actual pattern during the build.
const modules = import.meta.glob("%ISLAND_GLOB_PATTERN%");

// Polyfill for requestIdleCallback
const requestIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));

// Find all island marker scripts
const islands = document.querySelectorAll("script[data-island]");

islands.forEach((node) => {
  // The element to be hydrated
  const element = node.previousElementSibling;
  if (!element) throw new Error("Missing previousElementSibling");

  // The island source code to load
  const island = node.getAttribute("data-island");
  if (!island) throw new Error("Missing attribute: data-island");

  const load = modules[island];
  if (!load) throw new Error(`Island module not found: ${island}`);

  // Island props and options read from the marker script
  const { props = {}, options = {} } = node.textContent
    ? JSON.parse(node.textContent)
    : {};

  const hydrateComponent = async () => {
    const hydrate = (await import("virtual:capri-hydration-adapter")).default;
    const m: any = await load();
    hydrate(m.default, props, element);
  };

  // Function to schedule hydration based on loading strategy
  const scheduleHydration = () => {
    const { loading = "eager", media } = options;

    // Helper to handle media query
    const hydrateWithMedia = (callback: () => void) => {
      if (media && "matchMedia" in window) {
        const mql = matchMedia(media);
        if (mql.matches) {
          callback();
        } else {
          mql.addEventListener("change", callback, { once: true });
        }
      } else {
        callback();
      }
    };

    switch (loading) {
      case "idle":
        hydrateWithMedia(() => {
          requestIdle(() => hydrateComponent(), { timeout: 2000 });
        });
        break;

      case "visible":
        hydrateWithMedia(() => {
          const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              observer.disconnect();
              hydrateComponent();
            }
          });
          observer.observe(element);
        });
        break;

      case "eager":
      default:
        hydrateWithMedia(hydrateComponent);
        break;
    }
  };

  scheduleHydration();
});
