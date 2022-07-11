import { BuildTarget } from "capri/vite-plugin";
import * as path from "path";

type CloudflareOptions = {
  type?: "middleware" | "worker" | "auto";
};

export default function cloudflare({
  type = "auto",
}: CloudflareOptions = {}): BuildTarget {
  return {
    config() {
      return {
        ssr: {
          target: "webworker",
          noExternal: true,
        },
      };
    },
    async build({ rootDir, outDir, bundle, fsutils }) {
      const dirName = path.dirname(new URL(import.meta.url).pathname);
      const funcDir = path.resolve(rootDir, "functions");
      const worker = path.resolve(outDir, "_worker.js");
      const hasFunctions = fsutils.exists(funcDir);

      // Cloudflare ignores all functions if a _worker.js file is present
      if (hasFunctions && type === "worker") {
        console.warn(
          "Warning: The project contains a functions directory but type is set to 'worker'."
        );
      }

      const useWorker = type === "worker" || (type === "auto" && !hasFunctions);

      // Make sure no old _worker.js file is in the way
      if (!useWorker && fsutils.exists(worker)) {
        console.info("Removing old _worker.js file");
        fsutils.rm(worker);
      }

      // Cloudflare treats projects without a 404 page as SPA.
      // To enable MPA mode we add a basic error page if no custom one exists.
      const notFound = path.resolve(outDir, "404.html");
      if (!fsutils.exists(notFound)) {
        fsutils.copy(
          path.resolve(dirName, "..", "files", "404.html"),
          notFound
        );
      }

      if (useWorker) {
        // Create the worker
        await bundle(
          path.resolve(dirName, "worker.js"),
          path.resolve(outDir, "_worker.js")
        );
      } else {
        // Create the middleware
        await bundle(
          path.resolve(dirName, "middleware.js"),
          path.resolve(funcDir, "_middleware.js"),
          { target: "es2017" }
        );
      }
    },
  };
}
