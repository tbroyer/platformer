import { runTests } from "@platformer/reflect-harness";
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
import { FASTElement } from "@microsoft/fast-element";

FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-string",
      attributes: [{ property: "_test", attribute: "test", mode: "fromView" }],
    };
    get test() {
      return reflectString.fromAttribute(this._test);
    }
    set test(value) {
      value = reflectString.coerceValue(value);
      reflectString.setAttribute(this, "test", value);
    }
  },
);

FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-url",
      attributes: [{ property: "_test", attribute: "test", mode: "fromView" }],
    };
    get test() {
      return reflectURL.fromAttribute(this, this._test);
    }
    set test(value) {
      value = reflectURL.coerceValue(value);
      reflectURL.setAttribute(this, "test", value);
    }
  },
);

const testEnum = reflectEnum({
  keywords: ["", "one", "two", "three", "missing", "invalid"],
  aliases: { empty: "", un: "one", deux: "two", trois: "three" },
  missing: "missing",
  invalid: "invalid",
});
FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-enum",
      attributes: [
        {
          property: "_test",
          attribute: "test",
          mode: "fromView",
          converter: {
            fromView: testEnum.fromAttribute,
          },
        },
      ],
    };
    get test() {
      return this._test ?? testEnum.defaultValue;
    }
    set test(value) {
      value = testEnum.coerceValue(value);
      testEnum.setAttribute(this, "test", value);
    }
  },
);
const testNullableEnum = reflectNullableEnum({
  keywords: ["use-credentials", "anonymous"],
  invalid: "anonymous",
});
FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-nullable-enum",
      attributes: [
        {
          property: "_test",
          attribute: "test",
          mode: "fromView",
          converter: {
            fromView: testNullableEnum.fromAttribute,
          },
        },
      ],
    };
    get test() {
      return this._test ?? testNullableEnum.defaultValue;
    }
    set test(value) {
      value = testNullableEnum.coerceValue(value);
      testNullableEnum.setAttribute(this, "test", value);
    }
  },
);

FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-boolean",
      attributes: [
        {
          property: "_test",
          attribute: "test",
          mode: "fromView",
          converter: { fromView: reflectBoolean.fromAttribute },
        },
      ],
    };
    get test() {
      return this._test ?? reflectBoolean.defaultValue;
    }
    set test(value) {
      value = reflectBoolean.coerceValue(value);
      reflectBoolean.setAttribute(this, "test", value);
    }
  },
);

const testLong = reflectInt({ defaultValue: 42 });
FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-long",
      attributes: [
        {
          property: "_test",
          attribute: "test",
          mode: "fromView",
          converter: {
            fromView: testLong.fromAttribute,
          },
        },
      ],
    };
    get test() {
      return this._test ?? testLong.defaultValue;
    }
    set test(value) {
      value = testLong.coerceValue(value);
      testLong.setAttribute(this, "test", value);
    }
  },
);
const testLimitedLong = reflectNonNegativeInt();
FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-limited-long",
      attributes: [
        {
          property: "_test",
          attribute: "test",
          mode: "fromView",
          converter: {
            fromView: testLimitedLong.fromAttribute,
          },
        },
      ],
    };
    get test() {
      return this._test ?? testLimitedLong.defaultValue;
    }
    set test(value) {
      value = testLimitedLong.coerceValue(value);
      testLimitedLong.setAttribute(this, "test", value);
    }
  },
);
const testUnsignedLong = reflectUnsignedInt({ defaultValue: 42 });
FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-unsigned-long",
      attributes: [
        {
          property: "_test",
          attribute: "test",
          mode: "fromView",
          converter: {
            fromView: testUnsignedLong.fromAttribute,
          },
        },
      ],
    };
    get test() {
      return this._test ?? testUnsignedLong.defaultValue;
    }
    set test(value) {
      value = testUnsignedLong.coerceValue(value);
      testUnsignedLong.setAttribute(this, "test", value);
    }
  },
);
const testLimitedUnsignedLong = reflectPositiveInt();
FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-limited-unsigned-long",
      attributes: [
        {
          property: "_test",
          attribute: "test",
          mode: "fromView",
          converter: {
            fromView: testLimitedUnsignedLong.fromAttribute,
          },
        },
      ],
    };
    get test() {
      return this._test ?? testLimitedUnsignedLong.defaultValue;
    }
    set test(value) {
      value = testLimitedUnsignedLong.coerceValue(value);
      testLimitedUnsignedLong.setAttribute(this, "test", value);
    }
  },
);
const testLimitedUnsignedLongWithFallback = reflectPositiveIntWithFallback();
FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-limited-unsigned-long-with-fallback",
      attributes: [
        {
          property: "_test",
          attribute: "test",
          mode: "fromView",
          converter: {
            fromView: testLimitedUnsignedLongWithFallback.fromAttribute,
          },
        },
      ],
    };
    get test() {
      return this._test ?? testLimitedUnsignedLongWithFallback.defaultValue;
    }
    set test(value) {
      value = testLimitedUnsignedLongWithFallback.coerceValue(value);
      testLimitedUnsignedLongWithFallback.setAttribute(this, "test", value);
    }
  },
);
const testClampedUnsignedLong = reflectClampedInt({
  min: 42,
  defaultValue: 100,
  max: 1337,
});
FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-clamped-unsigned-long",
      attributes: [
        {
          property: "_test",
          attribute: "test",
          mode: "fromView",
          converter: {
            fromView: testClampedUnsignedLong.fromAttribute,
          },
        },
      ],
    };
    get test() {
      return this._test ?? testClampedUnsignedLong.defaultValue;
    }
    set test(value) {
      value = testClampedUnsignedLong.coerceValue(value);
      testClampedUnsignedLong.setAttribute(this, "test", value);
    }
  },
);
const testDouble = reflectDouble();
FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-double",
      attributes: [
        {
          property: "_test",
          attribute: "test",
          mode: "fromView",
          converter: {
            fromView: testDouble.fromAttribute,
          },
        },
      ],
    };
    get test() {
      return this._test ?? testDouble.defaultValue;
    }
    set test(value) {
      value = testDouble.coerceValue(value);
      testDouble.setAttribute(this, "test", value);
    }
  },
);
const testLimitedDouble = reflectPositiveDouble();
FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-limited-double",
      attributes: [
        {
          property: "_test",
          attribute: "test",
          mode: "fromView",
          converter: {
            fromView: testLimitedDouble.fromAttribute,
          },
        },
      ],
    };
    get test() {
      return this._test ?? testLimitedDouble.defaultValue;
    }
    set test(value) {
      value = testLimitedDouble.coerceValue(value);
      testLimitedDouble.setAttribute(this, "test", value);
    }
  },
);

runTests({ disableElementReferences: true });
