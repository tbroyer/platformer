import assert from "node:assert";
import { describe, it } from "node:test";

import {
  coerceToCallbackFunction,
  coerceToLegacyCallbackFunction,
} from "@platformer/webidl";
import assertThrows from "./helpers/assertThrows.js";

describe("WebIDL callback function type", () => {
  const sut = coerceToCallbackFunction;

  it("should return `() => {}` for `() => {}`", () => {
    const func = () => {};
    assert.strictEqual(sut(func), func);
  });

  it("should throw a TypeError for `{}`", () => {
    const obj = {};
    assertThrows(sut, [obj], TypeError);
  });

  it("should throw a TypeError for `undefined`", () => {
    assertThrows(sut, [undefined], TypeError);
  });

  it("should throw a TypeError for `null`", () => {
    assertThrows(sut, [null], TypeError);
  });

  it("should throw a TypeError for `true`", () => {
    assertThrows(sut, [true], TypeError);
  });

  it("should throw a TypeError for `false`", () => {
    assertThrows(sut, [false], TypeError);
  });

  it("should throw a TypeError for `Infinity`", () => {
    assertThrows(sut, [Infinity], TypeError);
  });

  it("should throw a TypeError for `NaN`", () => {
    assertThrows(sut, [NaN], TypeError);
  });

  it("should throw a TypeError for `0`", () => {
    assertThrows(sut, [0], TypeError);
  });

  it("should throw a TypeError for `''`", () => {
    assertThrows(sut, [""], TypeError);
  });

  it("should throw a TypeError for `Symbol.iterator`", () => {
    assertThrows(sut, [Symbol.iterator], TypeError);
  });

  it("should throw a TypeError for `0n`", () => {
    assertThrows(sut, [0n], TypeError);
  });

  describe("[LegacyTreatNonObjectAsNull]", () => {
    const sut = coerceToLegacyCallbackFunction;
    it("should return `{}` for `{}`", () => {
      const obj = {};
      assert.strictEqual(sut(obj), obj);
    });

    it("should return `() => {}` for `() => {}`", () => {
      const func = () => {};
      assert.strictEqual(sut(func), func);
    });

    it("should return `new String('')` for `new String('')`", () => {
      const obj = new String("");
      assert.strictEqual(sut(obj), obj);
    });

    it("should return `new Number(42)` for `new Number(42)`", () => {
      const obj = new Number(42);
      assert.strictEqual(sut(obj), obj);
    });

    it("should return `null` for `undefined`", () => {
      assert.strictEqual(sut(undefined), null);
    });

    it("should return `null` for `null`", () => {
      assert.strictEqual(sut(null), null);
    });

    it("should return `null` for `true`", () => {
      assert.strictEqual(sut(true), null);
    });

    it("should return `null` for `false`", () => {
      assert.strictEqual(sut(false), null);
    });

    it("should return `null` for `Infinity`", () => {
      assert.strictEqual(sut(Infinity), null);
    });

    it("should return `null` for `NaN`", () => {
      assert.strictEqual(sut(NaN), null);
    });

    it("should return `null` for `0`", () => {
      assert.strictEqual(sut(0), null);
    });

    it("should return `null` for `''`", () => {
      assert.strictEqual(sut(""), null);
    });

    it("should return `null` for `Symbol.iterator`", () => {
      assert.strictEqual(sut(Symbol.iterator), null);
    });

    it("should return `null` for `0n`", () => {
      assert.strictEqual(sut(0n), null);
    });
  });
});
