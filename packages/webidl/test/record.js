import assert from "node:assert";
import { describe, it } from "node:test";

import {
  coerceToByteString,
  coerceToDouble,
  coerceToRecord,
} from "@webfeet/webidl";
import assertThrows from "./helpers/assertThrows.js";

describe("WebIDL enumeration type", () => {
  const sut = (value) =>
    coerceToRecord(coerceToByteString, coerceToDouble, value);

  it("should return `{}` for `() => {}`", () => {
    const func = () => {};
    assert.deepStrictEqual(sut(func), {});
  });

  it("should return `{}` for `{}`", () => {
    const initial = {};
    const actual = sut(initial);
    assert.deepStrictEqual(actual, {});
    // a new object, not the same object
    assert.notStrictEqual(actual, initial);
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

  it("should return a new object", () => {
    const initial = { foo: 12, bar: "3.45" };
    const actual = sut(initial);
    assert.deepStrictEqual(actual, { foo: 12, bar: 3.45 });

    // the object is mutable
    actual.baz = 67.8;
    assert.deepStrictEqual(actual, { foo: 12, bar: 3.45, baz: 67.8 });
  });

  it("should throw if key/value-coercion throw", () => {
    assertThrows(sut, [{ foo: 1, 中文: 2 }], TypeError);
    assertThrows(sut, [{ foo: 1, bar: 2n }], TypeError);
  });

  it("should copy enumerable properties for any object", () => {
    assert.deepStrictEqual(
      sut(Object.assign(function fn() {}, { foo: 1, bar: "2" })),
      { foo: 1, bar: 2 },
    );
    assert.deepStrictEqual(sut([1, "2"]), { 0: 1, 1: 2 });

    class Cls {
      foo = 1;
      bar = "2";
    }
    assert.deepStrictEqual(sut(new Cls()), { foo: 1, bar: 2 });
  });
});
