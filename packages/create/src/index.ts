#!/usr/bin/env node

import arg from "arg";
import degit from "degit";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import prompts from "prompts";

const templates = [
  { title: "React", value: "capri-js/capri/examples/react" },
  { title: "Preact", value: "capri-js/capri/examples/preact" },
];

const args = arg({
  "--force": Boolean,
});

const [dir, template] = args._;

const overrides: Record<string, string> = {};
if (dir) overrides.dir = dir;

if (template) {
  if (template.includes("/")) {
    overrides.template = template;
  } else {
    const option = templates.find(
      (t) => t.title.toLowerCase() === template.toLowerCase(),
    );
    if (option) {
      overrides.template = option.value;
    }
  }
}
prompts.override(overrides);

const opts = await prompts([
  {
    name: "dir",
    type: "text",
    message: "Directory name",
    initial: "my-capri-site",
  },
  {
    name: "template",
    type: "select",
    message: "Template",
    choices: templates,
  },
]);

const spinner = ora(`Downloading ${opts.template}`).start();
try {
  await degit(opts.template, { force: args["--force"] }).clone(opts.dir);
  await updatePackageJSON(opts.dir, path.basename(opts.dir));
  spinner.succeed(`Created ${opts.dir}`);
} catch (err: any) {
  spinner.fail(err.message);
}

export async function updatePackageJSON(
  projectDir: string,
  projectName: string,
) {
  const file = path.resolve(projectDir, "package.json");
  try {
    const json = await fs.readJson(file);
    json.name = projectName;
    await fs.writeJson(file, json, { spaces: 2 });
  } catch (err: unknown) {
    throw new Error("Unable to update name in package.json");
  }
}
