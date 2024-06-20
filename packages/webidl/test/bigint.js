/* eslint-disable no-new-wrappers */
import assert from "node:assert";
import { describe, it } from "node:test";

import { coerceToBigInt as sut } from "@platformer/webidl";
import assertThrows from "./helpers/assertThrows.js";

describe("WebIDL bigint type", () => {
  it("should throw a TypeError for `undefined`", () => {
    assertThrows(sut, [undefined], TypeError);
  });

  it("should throw a TypeError for `null`", () => {
    assertThrows(sut, [null], TypeError);
  });

  it("should return 1n for `true`", () => {
    assert.strictEqual(sut(true), 1n);
  });

  it("should return input for bigints", () => {
    assert.strictEqual(sut(0n), 0n);
    assert.strictEqual(sut(1n), 1n);
    assert.strictEqual(sut(-1n), -1n);
    assert.strictEqual(sut(10n ** 309n), 10n ** 309n);
    assert.strictEqual(sut(-(10n ** 309n)), -(10n ** 309n));
  });

  it("should throw a TypeError for numbers", () => {
    assertThrows(sut, [0], TypeError);
    assertThrows(sut, [-0], TypeError);
    assertThrows(sut, [1], TypeError);
    assertThrows(sut, [-1], TypeError);
    assertThrows(sut, [NaN], TypeError);
    assertThrows(sut, [Infinity], TypeError);
    assertThrows(sut, [-Infinity], TypeError);
  });

  it("should return a bigint for strings that represent integers", () => {
    assert.strictEqual(sut(""), 0n);
    assert.strictEqual(sut(" "), 0n);
    assert.strictEqual(sut("+0"), 0n);
    assert.strictEqual(sut("-0"), 0n);
    assert.strictEqual(sut("1"), 1n);
    assert.strictEqual(sut("-1"), -1n);
    assert.strictEqual(sut((10n ** 309n).toString()), 10n ** 309n);
    assert.strictEqual(sut((-(10n ** 309n)).toString()), -(10n ** 309n));
  });

  it("should throw a SyntaxError for strings that don't represent integers", () => {
    assertThrows(sut, ["0.1"], SyntaxError);
    assertThrows(sut, ["1e2"], SyntaxError);
    assertThrows(sut, ["a"], SyntaxError);
  });

  it("should throw a TypeError for symbols", () => {
    assertThrows(sut, [Symbol.iterator], TypeError);
    assertThrows(sut, [Symbol()], TypeError);
  });

  it("should throw a SyntaxError for `{}`", () => {
    assertThrows(sut, [{}], SyntaxError);
  });

  it("should throw a SyntaxError for `() => {}`", () => {
    assertThrows(sut, [() => {}], SyntaxError);
  });

  it("should throw a TypeError for objects that cannot be converted to primitives", () => {
    assertThrows(sut, [Object.create(null)], TypeError);
    assertThrows(sut, [{ toString: null, valueOf: null }], TypeError);
  });

  it("should convert objects to their primitive value", () => {
    assert.strictEqual(sut(new Boolean(false)), 0n);
    assert.strictEqual(sut(new String("0")), 0n);
    assert.strictEqual(
      sut({
        [Symbol.toPrimitive]() {
          return 0n;
        },
      }),
      0n,
    );
    assert.strictEqual(
      sut({
        [Symbol.toPrimitive]() {
          return false;
        },
      }),
      0n,
    );
    assert.strictEqual(
      sut({
        [Symbol.toPrimitive]() {
          return "0";
        },
      }),
      0n,
    );
  });

  it("should throw a TypeError for objects that convert to a number primitive", () => {
    assertThrows(sut, [new Number(0)], TypeError);
    assertThrows(
      sut,
      [
        {
          [Symbol.toPrimitive]() {
            return 0;
          },
        },
      ],
      TypeError,
    );
  });

  it("should prefer valueOf to toString on objects", () => {
    const o = {
      valueOf() {
        return 5n;
      },
      toString() {
        return "foo";
      },
    };
    assert.strictEqual(sut(o), 5n);
  });

  it("should prefer toPrimitive to valueOf or toString on objects", () => {
    const o = {
      [Symbol.toPrimitive]() {
        return 5n;
      },
      valueOf() {
        return "foo";
      },
      toString() {
        return "bar";
      },
    };
    assert.strictEqual(sut(o), 5n);
  });
});
