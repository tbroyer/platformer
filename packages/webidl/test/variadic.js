import assert from "node:assert";
import { describe, it } from "node:test";

import { coerceVariadic as sut } from "@webfeet/webidl";

describe("WebIDL variadic arguments", () => {
  it("should return an array of the appropriate size", () => {
    function testFn(first, second, ...rest) {
      return sut(undefined, rest);
    }
    assert.deepStrictEqual(testFn(1), []);
    assert.deepStrictEqual(testFn(1, 2), []);
    assert.deepStrictEqual(testFn(1, 2, 3), [3]);
    assert.deepStrictEqual(testFn(1, 2, 3, 4, 5), [3, 4, 5]);
    assert.deepStrictEqual(testFn(1, 2, undefined), [undefined]);
    assert.deepStrictEqual(testFn(1, 2, null), [null]);
    assert.deepStrictEqual(testFn(1, 2, []), [[]]);
  });
  it("should call coerceValue for each value", () => {
    function testFn(first, second, ...rest) {
      let coercedValues = [];
      const result = sut((value) => {
        coercedValues.push(value);
        return coercedValues.length;
      }, rest);
      assert.deepStrictEqual(coercedValues, rest);
      return result;
    }
    assert.deepStrictEqual(testFn(1), []);
    assert.deepStrictEqual(testFn(1, 2), []);
    assert.deepStrictEqual(testFn(1, 2, 3), [1]);
    assert.deepStrictEqual(testFn(1, 2, 3, 4, 5), [1, 2, 3]);
  });
  it("should propagate coerceValue errors", () => {
    assert.throws(
      () =>
        sut(
          (value) => {
            if (value % 2 === 0) {
              throw new TypeError();
            }
            return value;
          },
          [1, 2, 3],
        ),
      TypeError,
    );
    const expected = { test: 42 };
    assert.throws(
      () =>
        sut(
          (value) => {
            if (value % 2 === 0) {
              throw expected;
            }
            return value;
          },
          [1, 2, 3],
        ),
      expected,
    );
  });
});
