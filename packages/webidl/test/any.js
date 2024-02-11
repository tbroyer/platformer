import assert from "node:assert";
import { describe, it } from 'node:test';

// Copied from the webidl-conversions@7.0.0 NPM package

import { coerceToAny as sut } from "../index.js";

describe("WebIDL any type", () => {
  it("should return `undefined` for `undefined`", () => {
    assert.strictEqual(sut(undefined), undefined);
  });

  it("should return `null` for `null`", () => {
    assert.strictEqual(sut(null), null);
  });

  it("should return `true` for `true`", () => {
    assert.strictEqual(sut(true), true);
  });

  it("should return `false` for `false`", () => {
    assert.strictEqual(sut(false), false);
  });

  it("should return `Infinity` for `Infinity`", () => {
    assert.strictEqual(sut(Infinity), Infinity);
  });

  it("should return `-Infinity` for `-Infinity`", () => {
    assert.strictEqual(sut(-Infinity), -Infinity);
  });

  it("should return `NaN` for `NaN`", () => {
    assert(isNaN(sut(NaN)));
  });

  it("should return `0` for `0`", () => {
    assert.strictEqual(sut(0), 0);
  });

  it("should return `-0` for `-0`", () => {
    assert(Object.is(sut(-0), -0));
  });

  it("should return `1` for `1`", () => {
    assert.strictEqual(sut(1), 1);
  });

  it("should return `-1` for `-1`", () => {
    assert.strictEqual(sut(-1), -1);
  });

  it("should return `''` for `''`", () => {
    assert.strictEqual(sut(""), "");
  });

  it("should return `'a'` for `'a'`", () => {
    assert.strictEqual(sut("a"), "a");
  });

  it("should return `{}` for `{}`", () => {
    const obj = {};
    assert.strictEqual(sut(obj), obj);
  });

  it("should return `() => {}` for `() => {}`", () => {
    const func = () => {};
    assert.strictEqual(sut(func), func);
  });

  it("should return `Symbol.iterator` for `Symbol.iterator`", () => {
    assert.strictEqual(sut(Symbol.iterator), Symbol.iterator);
  });

  it("should return `Symbol('a')` for `Symbol('a')`", () => {
    const sym = Symbol('a');
    assert.strictEqual(sut(sym), sym);
  });

  it("should return `0n` for `0n`", () => {
    assert.strictEqual(sut(0n), 0n);
  });
});
