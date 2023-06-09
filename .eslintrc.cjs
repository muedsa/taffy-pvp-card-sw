module.exports = {
  root: true,
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      plugins: ["@typescript-eslint"],
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
  ],
  parserOptions: {
    sourceType: "module",
  },
  env: {
    node: true,
    es2022: true,
  },
};
