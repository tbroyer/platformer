import { fromRollup } from "@web/dev-server-rollup";
import rollupCommonjs from "@rollup/plugin-commonjs";
import rollupNodeResolve from "@rollup/plugin-node-resolve";

export default {
  nodeResolve: true,
  rootDir: "../../",
  testFramework: {
    config: {
      ui: "tdd",
    },
  },
  plugins: [
    fromRollup(rollupCommonjs)(),
    fromRollup(rollupNodeResolve)({ browser: true, rootDir: "../../" }),
  ],
};
