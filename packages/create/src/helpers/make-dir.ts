import fs from "fs";

export async function makeDir(root: string, options = { recursive: true }) {
  await fs.promises.mkdir(root, options);
}
