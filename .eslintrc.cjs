module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    worker: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
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
    "@typescript-eslint/triple-slash-reference": "off", // We need them to surface our ambient module declarations.

    // Enforce extensions for all imports except for jsx/tsx as they will be handled by Vite anyways.
    // Unfortunately this doesn't work as we'd like: https://github.com/import-js/eslint-plugin-import/issues/2111
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        tsx: "never",
        jsx: "never",
      },
    ],
    "import/no-unresolved": "off", // Also see https://github.com/import-js/eslint-plugin-import/issues/2111

    "simple-import-sort/imports": "error", // Set to "error" so that --fix will do its magic
    "simple-import-sort/exports": "error", // Set to "error" so that --fix will do its magic
  },
};
