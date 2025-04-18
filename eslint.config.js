import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import packageJson from "eslint-plugin-package-json";

export default defineConfig([
  {
    files: ["**/package.json"],
    plugins: {
      "package-json": packageJson,
    },
    extends: ["package-json/recommended"],
    rules: {
      "package-json/require-version": "off",
    },
  },
  {
    files: ["**/*.js"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["packages/*/harness/**/*.js", "**/test.js", "**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  },
  {
    files: ["packages/*/lit/**/*.js", "packages/*/vanilla/**/*.js"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: [
            ["@babel/plugin-proposal-decorators", { version: "2023-11" }],
          ],
        },
      },
    },
  },
]);
