#!/usr/bin/env node

import chalk from "chalk";
import Commander from "commander";
import path from "path";
import prompts from "prompts";

import { createCapri, DownloadError } from "./create-capri";
import { getPkgManager } from "./helpers/get-pkg-manager";
import { validateNpmName } from "./helpers/validate-pkg";

let projectPath = "";

const program = new Commander.Command("create-capri")
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action((name) => {
    projectPath = name;
  })
  .option(
    "--use-npm",
    `

  Explicitly tell the CLI to bootstrap the app using npm
`
  )
  .option(
    "--use-pnpm",
    `

  Explicitly tell the CLI to bootstrap the app using pnpm
`
  )
  .option(
    "-e, --example [name]|[github-url]",
    `

  An example to bootstrap the app with. You can use an example name
  from the official Next.js repo or a GitHub URL. The URL can use
  any branch and/or subdirectory
`
  )
  .option(
    "--example-path <path-to-example>",
    `

  In a rare case, your GitHub URL might contain a branch name with
  a slash (e.g. bug/fix-1) and the path to the example (e.g. foo/bar).
  In this case, you must specify the path to the example separately:
  --example-path foo/bar
`
  )
  .allowUnknownOption()
  .parse(process.argv);

const options = program.opts();

async function run(): Promise<void> {
  if (typeof projectPath === "string") {
    projectPath = projectPath.trim();
  }

  if (!projectPath) {
    const res = await prompts({
      type: "text",
      name: "path",
      message: "What is your project named?",
      initial: "my-site",
      validate: (name) => {
        const validation = validateNpmName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }
        return "Invalid project name: " + validation.problems![0];
      },
    });

    if (typeof res.path === "string") {
      projectPath = res.path.trim();
    }
  }

  if (!projectPath) {
    console.log(
      "\nPlease specify the project directory:\n" +
        `  ${chalk.cyan(program.name())} ${chalk.green(
          "<project-directory>"
        )}\n` +
        "For example:\n" +
        `  ${chalk.cyan(program.name())} ${chalk.green("my-site")}\n\n` +
        `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const { valid, problems } = validateNpmName(projectName);
  if (!valid) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    );

    problems!.forEach((p) => console.error(`    ${chalk.red.bold("*")} ${p}`));
    process.exit(1);
  }

  if (options.example === true) {
    console.error(
      "Please provide an example name or url, otherwise remove the example option."
    );
    process.exit(1);
  }

  const packageManager = options.useNpm
    ? "npm"
    : options.usePnpm
      ? "pnpm"
      : getPkgManager();

  const example = typeof options.example === "string" && options.example.trim();
  try {
    await createCapri({
      appPath: resolvedProjectPath,
      packageManager,
      example: example || "preact",
      examplePath: options.examplePath,
    });
  } catch (reason) {
    if (reason instanceof DownloadError) {
      console.error(
        `Could not download "${example}" because of a connectivity issue between your machine and GitHub.`
      );
    }
    throw reason;
  }
}

run().catch(async (reason) => {
  console.log();
  console.log("Aborting installation.");
  if (reason.command) {
    console.log(`  ${chalk.cyan(reason.command)} has failed.`);
  } else {
    console.log(
      chalk.red("Unexpected error. Please report it as a bug:") + "\n",
      reason
    );
  }
  console.log();
  process.exit(1);
});
