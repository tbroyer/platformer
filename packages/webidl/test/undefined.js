import assert from "node:assert";
import { describe, it } from 'node:test';

// Copied from the webidl-conversions@7.0.0 NPM package

import { coerceToUndefined as sut } from "../index.js";

describe("WebIDL undefined type", () => {
  it("should return `undefined` for everything", () => {
    assert.strictEqual(sut(undefined), undefined);
    assert.strictEqual(sut(null), undefined);
    assert.strictEqual(sut(""), undefined);
    assert.strictEqual(sut(123), undefined);
    assert.strictEqual(sut("123"), undefined);
    assert.strictEqual(sut({}), undefined);
    assert.strictEqual(sut(Object.create(null)), undefined);
  });
});
