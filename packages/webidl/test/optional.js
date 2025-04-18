import assert from "node:assert";
import { describe, it } from "node:test";

import { coerceOptional as sut } from "@webfeet/webidl";

describe("WebIDL optional argument", () => {
  it("should return `undefined` for an `undefined` input", () => {
    assert.strictEqual(
      sut(
        (value) =>
          assert.fail(
            `coerceValue should not be called (called with ${JSON.stringify(value)})`,
          ),
        undefined,
      ),
      undefined,
    );
  });
  it("should call coerceValue for every non-`undefined` input", () => {
    function doTest(input) {
      let called = false;
      const actual = sut((value) => {
        assert(!called, "coerceValue should only be called once");
        called = true;
        return value;
      }, input);
      assert(called, "coerceValue should have been called");
      assert.strictEqual(actual, input);
    }
    const TEST_INPUT = [
      null,
      true,
      false,
      "",
      123,
      "123",
      {},
      Object.create(null),
      [],
      () => {},
    ];
    for (const input of TEST_INPUT) {
      doTest(input);
    }
  });
  it("should propagate coerceValue errors", () => {
    assert.throws(
      () =>
        sut(() => {
          throw new TypeError();
        }, 42),
      TypeError,
    );
    const expected = { test: 42 };
    assert.throws(
      () =>
        sut(() => {
          throw expected;
        }, 42),
      expected,
    );
  });
});
