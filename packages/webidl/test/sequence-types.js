import assert from "node:assert";
import { describe, it } from "node:test";

import {
  coerceToSequence,
  coerceToFrozenArray,
  coerceToDouble,
} from "@platformer/webidl";
import assertThrows from "./helpers/assertThrows.js";

function commonTest(sut) {
  it("should throw a TypeError for `() => {}`", () => {
    const func = () => {};
    assertThrows(sut, [func], TypeError);
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

  it("should return a new array", () => {
    const initial = [];
    const actual = sut(initial);
    assert(Array.isArray(actual));
    assert.deepStrictEqual(actual, []);
    assert.notStrictEqual(actual, initial);
  });
  it("should accept any object iterable", () => {
    const initial = new Set([12, "3.45"]);
    const actual = sut(initial);
    assert(Array.isArray(actual));
    assert.deepStrictEqual(new Set(actual), new Set([12, 3.45]));
  });
  it("should throw if value-coercion throws", () => {
    assertThrows(sut, [[1, 2n]], TypeError);
  });
}

describe("WebIDL sequence type", () => {
  const sut = (value) => coerceToSequence(coerceToDouble, value);

  commonTest(sut);

  describe("should return a modifiable array", () => {
    const actual = sut([]);
    assert(!Object.isFrozen(actual));
    actual.push(1, 2, 3);
    assert.deepStrictEqual(actual, [1, 2, 3]);
  });
});

describe("WebIDL FrozenArray type", () => {
  const sut = (value) => coerceToFrozenArray(coerceToDouble, value);

  commonTest(sut);

  describe("should return a frozen array", () => {
    assert(Object.isFrozen(sut([])));
  });
});
