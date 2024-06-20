import assert from "node:assert";
import { describe, it } from "node:test";

import { coerceToSymbol as sut } from "@platformer/webidl";
import assertThrows from "./helpers/assertThrows.js";

describe("WebIDL symbol type", () => {
  it("should return the input for symbols", () => {
    assert.strictEqual(sut(Symbol.iterator), Symbol.iterator);
    assert.strictEqual(sut(Symbol.for("a")), Symbol.for("a"));
    const sym = Symbol();
    assert.strictEqual(sut(sym), sym);
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

  it("should throw a TypeError for `{}`", () => {
    assertThrows(sut, [{}], TypeError);
  });

  it("should throw a TypeError for `() => {}`", () => {
    const func = () => {};
    assertThrows(sut, [func], TypeError);
  });

  it("should throw a TypeError for `0n`", () => {
    assertThrows(sut, [0n], TypeError);
  });
});
