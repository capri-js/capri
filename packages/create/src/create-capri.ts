import retry from "async-retry";
import chalk from "chalk";
import path from "path";

import {
  downloadAndExtractExample,
  downloadAndExtractRepo,
  getRepoInfo,
  hasExample,
  hasRepo,
  RepoInfo,
} from "./helpers/examples.js";
import type { PackageManager } from "./helpers/get-pkg-manager.js";
import { tryGitInit } from "./helpers/git.js";
import { install } from "./helpers/install.js";
import { isFolderEmpty } from "./helpers/is-folder-empty.js";
import { getOnline } from "./helpers/is-online.js";
import { isWriteable } from "./helpers/is-writeable.js";
import { makeDir } from "./helpers/make-dir.js";

export class DownloadError extends Error {}

export async function createCapri({
  appPath,
  packageManager,
  example,
  examplePath,
}: {
  appPath: string;
  packageManager: PackageManager;
  example: string;
  examplePath?: string;
}): Promise<void> {
  let repoInfo: RepoInfo | undefined;

  if (example) {
    let repoUrl: URL | undefined;

    try {
      repoUrl = new URL(example);
    } catch (error: any) {
      if (error.code !== "ERR_INVALID_URL") {
        console.error(error);
        process.exit(1);
      }
    }

    if (repoUrl) {
      if (repoUrl.origin !== "https://github.com") {
        console.error(
          `Invalid URL: ${chalk.red(
            `"${example}"`
          )}. Only GitHub repositories are supported. Please use a GitHub URL and try again.`
        );
        process.exit(1);
      }

      repoInfo = await getRepoInfo(repoUrl, examplePath);

      if (!repoInfo) {
        console.error(
          `Found invalid GitHub URL: ${chalk.red(
            `"${example}"`
          )}. Please fix the URL and try again.`
        );
        process.exit(1);
      }

      const found = await hasRepo(repoInfo);

      if (!found) {
        console.error(
          `Could not locate the repository for ${chalk.red(
            `"${example}"`
          )}. Please check that the repository exists and try again.`
        );
        process.exit(1);
      }
    } else {
      const found = await hasExample(example);
      if (!found) {
        console.error(
          `Could not locate an example named ${chalk.red(`"${example}"`)}.`
        );
        process.exit(1);
      }
    }
  }

  const root = path.resolve(appPath);

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      "The project path is not writable, please check folder permissions and try again."
    );
    process.exit(1);
  }

  const appName = path.basename(root);

  await makeDir(root);
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const useYarn = packageManager === "yarn";
  const isOnline = !useYarn || (await getOnline());
  const originalDirectory = process.cwd();

  console.log(`Creating a new Capri project in ${chalk.green(root)}.`);
  console.log();

  process.chdir(root);

  /**
   * If an example repository is provided, clone it.
   */
  try {
    if (repoInfo) {
      const repoInfo2 = repoInfo;
      console.log(
        `Downloading files from repo ${chalk.cyan(
          example
        )}. This might take a moment.`
      );
      console.log();
      await retry(() => downloadAndExtractRepo(root, repoInfo2));
    } else {
      console.log(
        `Downloading files for example ${chalk.cyan(
          example
        )}. This might take a moment.`
      );
      console.log();
      await retry(() => downloadAndExtractExample(root, example));
    }
  } catch (reason) {
    throw new DownloadError(isErrorLike(reason) ? reason.message : reason + "");
  }

  console.log("Installing packages. This might take a couple of minutes.");
  console.log();

  await install(root, null, { packageManager, isOnline });
  console.log();

  if (tryGitInit(root)) {
    console.log("Initialized a git repository.");
    console.log();
  }

  let cdpath: string;
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${chalk.green("Success!")} Created ${appName} at ${appPath}`);
  console.log("Inside that directory, you can run several commands:");
  console.log();
  console.log(chalk.cyan(`  ${packageManager} ${useYarn ? "" : "run "}dev`));
  console.log("    Starts the development server.");
  console.log();
  console.log(chalk.cyan(`  ${packageManager} ${useYarn ? "" : "run "}build`));
  console.log("    Builds the site for production.");
  console.log();
  console.log(chalk.cyan(`  ${packageManager} start`));
  console.log("    Runs the built app in production mode.");
  console.log();
  console.log("We suggest that you begin by typing:");
  console.log();
  console.log(chalk.cyan("  cd"), cdpath);
  console.log(
    `  ${chalk.cyan(`${packageManager} ${useYarn ? "" : "run "}dev`)}`
  );
  console.log();
}

function isErrorLike(err: unknown): err is { message: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    typeof (err as { message?: unknown }).message === "string"
  );
}
