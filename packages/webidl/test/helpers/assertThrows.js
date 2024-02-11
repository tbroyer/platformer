import assert from "node:assert";

// Copied from the webidl-conversions@7.0.0 NPM package

export default (converter, args, exceptionType) => {
  assert.throws(() => converter(...args), exceptionType);
};
