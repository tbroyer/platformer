import js from "@eslint/js";
import globals from "globals";
import babelParser from "@babel/eslint-parser";

export default [
  {
    files: ["packages/lit/**/*.js", "packages/vanilla/**/*.js"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: [
            ["@babel/plugin-proposal-decorators", { version: "2023-05" }],
          ],
        },
      },
    },
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
      },
    },
  },
];
