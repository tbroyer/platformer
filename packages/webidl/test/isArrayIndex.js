import assert from "node:assert";
import { describe, it } from "node:test";

import { isArrayIndex as sut } from "@webfeet/webidl";

describe("WebIDL isArrayIndex", () => {
  it("should convert string input to number", () => {
    assert.strictEqual(sut("0"), 0);
    assert.strictEqual(sut("1"), 1);
    assert.strictEqual(sut("42"), 42);
    assert.strictEqual(sut("4294967295"), 4294967295);
  });
  it("should return false for non-number-like string input", () => {
    assert.strictEqual(sut(""), false);
    assert.strictEqual(sut("a"), false);
    assert.strictEqual(sut("Infinity"), false);
    assert.strictEqual(sut("+Infinity"), false);
    assert.strictEqual(sut("-Infinity"), false);
    assert.strictEqual(sut("1.2"), false);
    assert.strictEqual(sut("42n"), false);
  });
  it("should return false for out-of-range values", () => {
    assert.strictEqual(sut("-1"), false);
    assert.strictEqual(sut("-0"), false);
    assert.strictEqual(sut("4294967296"), false);
  });
  it("should return false for any non-string input", () => {
    assert.strictEqual(sut(0), false);
    assert.strictEqual(sut(1), false);
    assert.strictEqual(sut(NaN), false);
    assert.strictEqual(sut(1n), false);
    assert.strictEqual(sut(Symbol.toStringTag), false);
    assert.strictEqual(sut({}), false);
    assert.strictEqual(sut(Object.create(null)), false);
    assert.strictEqual(sut([]), false);
    assert.strictEqual(
      sut({
        toString() {
          return "1";
        },
      }),
      false,
    );
    assert.strictEqual(
      sut(() => "1"),
      false,
    );
  });
});
