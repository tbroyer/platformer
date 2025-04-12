import assert from "node:assert";
import { describe, it } from "node:test";

import { coerceToEnumeration } from "@webfeet/webidl";
import assertThrows from "./helpers/assertThrows.js";

describe("WebIDL enumeration type", () => {
  const sut = (value) => coerceToEnumeration(["one", "two", "three"], value);

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

  it("should return the input for allowed values", () => {
    assert.strictEqual(sut("one"), "one");
    assert.strictEqual(sut("two"), "two");
    assert.strictEqual(sut("three"), "three");
  });

  it("should throw a TypeError for non-allowed values", () => {
    assertThrows(sut, ["un"], TypeError);
    assertThrows(sut, [" one"], TypeError);
    assertThrows(sut, ["one "], TypeError);
    assertThrows(sut, ["One"], TypeError);
    assertThrows(sut, ["ONE"], TypeError);
  });
});
