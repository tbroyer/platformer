import { fromRollup } from "@web/dev-server-rollup";
import rollupBabel from "@rollup/plugin-babel";

const babel = fromRollup(rollupBabel);

export default {
  nodeResolve: {
    exportConditions: ["default"],
  },
  rootDir: "../../",
  testFramework: {
    config: {
      ui: "tdd",
    },
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      plugins: [["@babel/plugin-proposal-decorators", { version: "2023-05" }]],
    }),
  ],
};
