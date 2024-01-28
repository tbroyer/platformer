import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["packages/harness/wpt.js"],
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
