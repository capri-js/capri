module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      "./tsconfig.json",
      "./packages/*/tsconfig.json",
      "./examples/*/tsconfig.json",
    ],
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint", "simple-import-sort"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // Sometimes it's okay to take shortcuts. Use responsibly!
    "@typescript-eslint/no-non-null-assertion": "off", // Sometimes we know more than the compiler. Use responsibly!
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "none", // Unused args are fine. Helps future devs to know that they are there.
        ignoreRestSiblings: true, // This is a useful pattern to exclude properties from an object so we allow it.
      },
    ],
    "simple-import-sort/imports": "error", // Set to "error" so that --fix will do its magic
    "simple-import-sort/exports": "error", // Set to "error" so that --fix will do its magic
  },
};
