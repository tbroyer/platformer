import { runTests } from "@platformer/harness";
import {
  reflectBoolean,
  reflectClampedInt,
  reflectDouble,
  reflectEnum,
  reflectInt,
  reflectNonNegativeInt,
  reflectNullableEnum,
  reflectPositiveDouble,
  reflectPositiveInt,
  reflectPositiveIntWithFallback,
  reflectString,
  reflectURL,
  reflectUnsignedInt,
} from "@platformer/reflect";
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/* eslint-disable no-unused-vars, no-undef */

// FIXME:
// Babel cannot (7.23.10) decorate symbol-keyed members (https://github.com/babel/babel/issues/16292)
// Lit annotations don't work on #-private members

@customElement("test-string")
class TestString extends LitElement {
  @property({
    attribute: "test",
    converter: reflectString.fromAttribute,
  })
  accessor _test = reflectString.defaultValue;
  get test() {
    return this._test;
  }
  set test(value) {
    value = reflectString.coerceValue(value);
    reflectString.setAttribute(this, "test", value);
  }
}

@customElement("test-url")
class TestURL extends LitElement {
  @property({ attribute: "test" }) accessor _test;
  get test() {
    return reflectURL.fromAttribute(this, this._test);
  }
  set test(value) {
    value = reflectURL.coerceValue(value);
    reflectURL.setAttribute(this, "test", value);
  }
}

const testEnum = reflectEnum({
  keywords: ["", "one", "two", "three", "missing", "invalid"],
  aliases: { empty: "", un: "one", deux: "two", trois: "three" },
  missing: "missing",
  invalid: "invalid",
});
@customElement("test-enum")
class TestEnum extends LitElement {
  @property({
    attribute: "test",
    converter: testEnum.fromAttribute,
  })
  accessor _test = testEnum.defaultValue;
  get test() {
    return this._test;
  }
  set test(value) {
    value = testEnum.coerceValue(value);
    testEnum.setAttribute(this, "test", value);
  }
}
const testNullableEnum = reflectNullableEnum({
  keywords: ["use-credentials", "anonymous"],
  invalid: "anonymous",
});
@customElement("test-nullable-enum")
class TestNullableEnum extends LitElement {
  @property({
    attribute: "test",
    converter: testNullableEnum.fromAttribute,
  })
  accessor _test = testNullableEnum.defaultValue;
  get test() {
    return this._test;
  }
  set test(value) {
    value = testNullableEnum.coerceValue(value);
    testNullableEnum.setAttribute(this, "test", value);
  }
}

@customElement("test-boolean")
class TestBoolean extends LitElement {
  @property({ attribute: "test", converter: reflectBoolean.fromAttribute })
  accessor _test = reflectBoolean.defaultValue;
  get test() {
    return this._test;
  }
  set test(value) {
    value = reflectBoolean.coerceValue(value);
    reflectBoolean.setAttribute(this, "test", value);
  }
}

const testLong = reflectInt({ defaultValue: 42 });
@customElement("test-long")
class TestLong extends LitElement {
  @property({
    attribute: "test",
    converter: testLong.fromAttribute,
  })
  accessor _test = testLong.defaultValue;
  get test() {
    return this._test;
  }
  set test(value) {
    value = testLong.coerceValue(value);
    testLong.setAttribute(this, "test", value);
  }
}
const testLimitedLong = reflectNonNegativeInt();
@customElement("test-limited-long")
class TestLimitedLong extends LitElement {
  @property({
    attribute: "test",
    converter: testLimitedLong.fromAttribute,
  })
  accessor _test = testLimitedLong.defaultValue;
  get test() {
    return this._test;
  }
  set test(value) {
    value = testLimitedLong.coerceValue(value);
    testLimitedLong.setAttribute(this, "test", value);
  }
}
const testUnsignedLong = reflectUnsignedInt({ defaultValue: 42 });
@customElement("test-unsigned-long")
class TestUnsignedLong extends LitElement {
  @property({
    attribute: "test",
    converter: testUnsignedLong.fromAttribute,
  })
  accessor _test = testUnsignedLong.defaultValue;
  get test() {
    return this._test;
  }
  set test(value) {
    value = testUnsignedLong.coerceValue(value);
    testUnsignedLong.setAttribute(this, "test", value);
  }
}
const testLimitedUnsignedLong = reflectPositiveInt();
@customElement("test-limited-unsigned-long")
class TestLimitedUnsignedLong extends LitElement {
  @property({
    attribute: "test",
    converter: testLimitedUnsignedLong.fromAttribute,
  })
  accessor _test = testLimitedUnsignedLong.defaultValue;
  get test() {
    return this._test;
  }
  set test(value) {
    value = testLimitedUnsignedLong.coerceValue(value);
    testLimitedUnsignedLong.setAttribute(this, "test", value);
  }
}
const testLimitedUnsignedLongWithFallback = reflectPositiveIntWithFallback();
@customElement("test-limited-unsigned-long-with-fallback")
class TestLimitedUnsignedLongWithFallback extends LitElement {
  @property({
    attribute: "test",
    converter: testLimitedUnsignedLongWithFallback.fromAttribute,
  })
  accessor _test = testLimitedUnsignedLongWithFallback.defaultValue;
  get test() {
    return this._test;
  }
  set test(value) {
    value = testLimitedUnsignedLongWithFallback.coerceValue(value);
    testLimitedUnsignedLongWithFallback.setAttribute(this, "test", value);
  }
}
const testClampedUnsignedLong = reflectClampedInt({
  min: 42,
  defaultValue: 100,
  max: 1337,
});
@customElement("test-clamped-unsigned-long")
class TestClampedUnsignedLong extends LitElement {
  @property({
    attribute: "test",
    converter: testClampedUnsignedLong.fromAttribute,
  })
  accessor _test = testClampedUnsignedLong.defaultValue;
  get test() {
    return this._test;
  }
  set test(value) {
    value = testClampedUnsignedLong.coerceValue(value);
    testClampedUnsignedLong.setAttribute(this, "test", value);
  }
}
const testDouble = reflectDouble();
@customElement("test-double")
class TestDouble extends LitElement {
  @property({
    attribute: "test",
    converter: testDouble.fromAttribute,
  })
  accessor _test = testDouble.defaultValue;
  get test() {
    return this._test;
  }
  set test(value) {
    value = testDouble.coerceValue(value);
    testDouble.setAttribute(this, "test", value);
  }
}
const testLimitedDouble = reflectPositiveDouble();
@customElement("test-limited-double")
class TestLimitedDouble extends LitElement {
  @property({
    attribute: "test",
    converter: testLimitedDouble.fromAttribute,
  })
  accessor _test = testLimitedDouble.defaultValue;
  get test() {
    return this._test;
  }
  set test(value) {
    value = testLimitedDouble.coerceValue(value);
    testLimitedDouble.setAttribute(this, "test", value);
  }
}

runTests();
