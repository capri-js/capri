#!/usr/bin/env node

import arg from "arg";
import degit from "degit";
import ora from "ora";
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
      (t) => t.title.toLowerCase() === template.toLowerCase()
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
  spinner.succeed(`Created ${opts.dir}`);
} catch (err: any) {
  spinner.fail(err.message);
}
