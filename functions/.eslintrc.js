const path = require("node:path");

module.exports = {
  root: true,
  env: {
    es2017: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: [path.resolve(__dirname, "./tsconfig.json")],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    ".eslintrc.js",
    "gulpfile.js",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
  },
};
