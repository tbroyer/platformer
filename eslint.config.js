import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["packages/webidl/test/"],
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
