import assert from "node:assert";
import { describe, it } from "node:test";

import {
  coerceToBigIntOrNumericType,
  coerceToDouble,
} from "@platformer/webidl";
import assertThrows from "./helpers/assertThrows.js";

const sut = (value) => coerceToBigIntOrNumericType(coerceToDouble, value);

describe("WebIDL numeric or bigint", () => {
  it("should return `0` for `0`", () => {
    assert.strictEqual(sut(0), 0);
  });

  it("should return `-0` for `-0`", () => {
    assert.strictEqual(sut(-0), -0);
  });

  it("should return `42` for `42`", () => {
    assert.strictEqual(sut(42), 42);
  });

  it("should return `0` for `null`", () => {
    assert.strictEqual(sut(null), 0);
  });

  it('should return `0` for `""`', () => {
    assert.strictEqual(sut(""), 0);
  });

  it("should return `0` for `false`", () => {
    assert.strictEqual(sut(0), 0);
  });

  it("should return `1` for `true`", () => {
    assert.strictEqual(sut(null), 0);
  });

  it("should return `0` for random whitespace", () => {
    assert.strictEqual(sut(" \t\n\t "), 0);
  });

  it('should return `123` for `" 123 "`', () => {
    assert.strictEqual(sut(" 123 "), 123);
  });

  it('should return `-123.5` for `" -123.500 "`', () => {
    assert.strictEqual(sut(" -123.500 "), -123.5);
  });

  it("should return `0n` for `0n`", () => {
    assert.strictEqual(sut(0n), 0n);
  });

  it("should throw a TypeError for no argument", () => {
    assertThrows(sut, [], TypeError);
  });

  it("should throw a TypeError for `undefined`", () => {
    assertThrows(sut, [undefined], TypeError);
  });

  it("should throw a TypeError for `NaN`", () => {
    assertThrows(sut, [NaN], TypeError);
  });

  it("should throw a TypeError for `+Infinity`", () => {
    assertThrows(sut, [Infinity], TypeError);
  });

  it("should throw a TypeError for `-Infinity`", () => {
    assertThrows(sut, [-Infinity], TypeError);
  });

  it('should throw a TypeError for `" 123,123 "` (since it becomes `NaN`)', () => {
    assertThrows(sut, [" 123,123 "], TypeError);
  });

  it("should return `3.5000000000000004` for `3.5000000000000004`", () => {
    assert.strictEqual(sut(3.5000000000000004), 3.5000000000000004);
  });

  it("should return `-3.5000000000000004` for `-3.5000000000000004`", () => {
    assert.strictEqual(sut(-3.5000000000000004), -3.5000000000000004);
  });
});
