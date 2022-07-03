const fs = require("fs/promises");
const path = require("path");
const { spawn } = require("child_process");

async function build() {
  const dirs = await fs.readdir(path.resolve(__dirname, "../examples"));

  await Promise.all(
    dirs.map(
      (dir) =>
        new Promise(async (resolve, reject) => {
          const cwd = path.resolve(__dirname, "../examples", dir);
          const src = path.join(cwd, "dist");
          const dest = path.resolve(__dirname, "pages", dir);

          await fs.rm(dest, { recursive: true, force: true });
          const child = spawn("npm", ["run", "build"], {
            cwd,
            stdio: "inherit",
            env: {
              ...process.env,
              BASE_URL: `/capri/${dir}/`,
            },
          });
          child.once("exit", async (code) => {
            if (code) reject(code);
            else {
              await fs.rename(src, dest);
              resolve();
            }
          });
        })
    )
  );
  //"build:github": "BASE_URL=/capri/react/ npm run build && cp -r dist ../../.github/pages/react",
}

build()
  .then(() => console.log("done."))
  .catch(console.error);
