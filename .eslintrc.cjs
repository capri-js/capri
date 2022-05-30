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

    // Mimic Prettier's default formatting rules:
    // TODO put into separate package

    "array-bracket-spacing": ["error", "never"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs", { allowSingleLine: false }],
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error", { before: false, after: true }],
    "comma-style": ["error", "last"],
    "computed-property-spacing": [
      "error",
      "never",
      { enforceForClassMembers: true },
    ],
    "dot-location": ["error", "property"],
    "eol-last": "error",
    "func-call-spacing": ["error", "never"],
    "generator-star-spacing": ["error", { before: true, after: true }],

    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: true,
        ignoreComments: false,
        ignoredNodes: [
          "TemplateLiteral *",
          "JSXElement",
          "JSXElement > *",
          "JSXAttribute",
          "JSXIdentifier",
          "JSXNamespacedName",
          "JSXMemberExpression",
          "JSXSpreadAttribute",
          "JSXExpressionContainer",
          "JSXOpeningElement",
          "JSXClosingElement",
          "JSXFragment",
          "JSXOpeningFragment",
          "JSXClosingFragment",
          "JSXText",
          "JSXEmptyExpression",
          "JSXSpreadChild",
        ],
        offsetTernaryExpressions: false,
      },
    ],
    "jsx-quotes": ["error", "prefer-double"],
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "keyword-spacing": ["error", { before: true, after: true }],
    "multiline-ternary": ["error", "always-multiline"],
    "new-parens": "error",
    "no-extra-parens": ["error", "functions"],
    "no-extra-semi": "error",
    "no-floating-decimal": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    "no-trailing-spaces": "error",
    "no-whitespace-before-property": "error",
    "object-curly-newline": ["error", { multiline: true, consistent: true }],
    "object-curly-spacing": ["error", "always"],
    "object-property-newline": [
      "error",
      { allowMultiplePropertiesPerLine: true },
    ],
    "one-var": ["error", { initialized: "never" }],
    "operator-linebreak": [
      "error",
      "after",
      { overrides: { "?": "before", ":": "before", "|>": "before" } },
    ],
    "padded-blocks": [
      "error",
      { blocks: "never", switches: "never", classes: "never" },
    ],
    "quote-props": ["error", "as-needed"],
    quotes: [
      "error",
      "double",
      { allowTemplateLiterals: true, avoidEscape: true },
    ],
    "rest-spread-spacing": ["error", "never"],
    semi: ["error", "always"],
    "semi-spacing": ["error", { before: false, after: true }],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "error",
    "space-unary-ops": ["error", { words: true, nonwords: false }],
    "template-curly-spacing": ["error", "never"],
    "template-tag-spacing": ["error", "never"],
    "unicode-bom": ["error", "never"],
    "wrap-iife": ["error", "any", { functionPrototypeMethods: true }],
    "yield-star-spacing": ["error", "both"],
  },
};
