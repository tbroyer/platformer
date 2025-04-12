import assert from "node:assert";
import { describe, it } from "node:test";

import { coerceToInterface } from "@webfeet/webidl";
import assertThrows from "./helpers/assertThrows.js";

describe("WebIDL interface type", () => {
  class Foo {}
  class SubFoo extends Foo {}
  class Bar {}

  const sut = (value) => coerceToInterface(Foo, value);

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

  it("should return the value for a Foo", () => {
    const foo = new Foo();
    assert.strictEqual(sut(foo), foo);
  });
  it("should return the value for a Foo subclass", () => {
    const foo = new SubFoo();
    assert.strictEqual(sut(foo), foo);
  });
  it("should throw a TypeError for a Bar (unrelated to Foo)", () => {
    const bar = new Bar();
    assertThrows(sut, [bar], TypeError);
  });

  describe("with EventTarget", () => {
    const sut = (value) => coerceToInterface(EventTarget, value);
    it("should return the value for an EventTarget", () => {
      const target = new EventTarget();
      assert.strictEqual(sut(target), target);
    });
    it("should return the value for an EventTarget subclass", () => {
      const target = new AbortController().signal;
      assert.strictEqual(sut(target), target);
    });
    it("should throw a TypeError for a console", () => {
      assertThrows(sut, [globalThis.console], TypeError);
    });
  });
});
