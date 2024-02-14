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

const TEST = Symbol();

customElements.define(
  "test-string",
  class extends LitElement {
    static properties = {
      [TEST]: { attribute: "test" },
    };
    get test() {
      return reflectString.fromAttribute(this[TEST]);
    }
    set test(value) {
      value = reflectString.coerceValue(value);
      reflectString.setAttribute(this, "test", value);
    }
  },
);

customElements.define(
  "test-url",
  class extends LitElement {
    static properties = {
      [TEST]: { attribute: "test" },
    };
    get test() {
      return reflectURL.fromAttribute(this, this[TEST]);
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
customElements.define(
  "test-enum",
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: testEnum.fromAttribute,
      },
    };
    get test() {
      return this[TEST] ?? testEnum.defaultValue;
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
customElements.define(
  "test-nullable-enum",
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: testNullableEnum.fromAttribute,
      },
    };
    get test() {
      return this[TEST] ?? testNullableEnum.defaultValue;
    }
    set test(value) {
      value = testNullableEnum.coerceValue(value);
      testNullableEnum.setAttribute(this, "test", value);
    }
  },
);

customElements.define(
  "test-boolean",
  class extends LitElement {
    static properties = {
      [TEST]: { attribute: "test", converter: reflectBoolean.fromAttribute },
    };
    get test() {
      return this[TEST] ?? reflectBoolean.defaultValue;
    }
    set test(value) {
      value = reflectBoolean.coerceValue(value);
      reflectBoolean.setAttribute(this, "test", value);
    }
  },
);

const testLong = reflectInt({ defaultValue: 42 });
customElements.define(
  "test-long",
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: testLong.fromAttribute,
      },
    };
    get test() {
      return this[TEST] ?? testLong.defaultValue;
    }
    set test(value) {
      value = testLong.coerceValue(value);
      testLong.setAttribute(this, "test", value);
    }
  },
);
const testLimitedLong = reflectNonNegativeInt();
customElements.define(
  "test-limited-long",
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: testLimitedLong.fromAttribute,
      },
    };
    get test() {
      return this[TEST] ?? testLimitedLong.defaultValue;
    }
    set test(value) {
      value = testLimitedLong.coerceValue(value);
      testLimitedLong.setAttribute(this, "test", value);
    }
  },
);
const testUnsignedLong = reflectUnsignedInt({ defaultValue: 42 });
customElements.define(
  "test-unsigned-long",
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: testUnsignedLong.fromAttribute,
      },
    };
    get test() {
      return this[TEST] ?? testUnsignedLong.defaultValue;
    }
    set test(value) {
      value = testUnsignedLong.coerceValue(value);
      testUnsignedLong.setAttribute(this, "test", value);
    }
  },
);
const testLimitedUnsignedLong = reflectPositiveInt();
customElements.define(
  "test-limited-unsigned-long",
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: testLimitedUnsignedLong.fromAttribute,
      },
    };
    get test() {
      return this[TEST] ?? testLimitedUnsignedLong.defaultValue;
    }
    set test(value) {
      value = testLimitedUnsignedLong.coerceValue(value);
      testLimitedUnsignedLong.setAttribute(this, "test", value);
    }
  },
);
const testLimitedUnsignedLongWithFallback = reflectPositiveIntWithFallback();
customElements.define(
  "test-limited-unsigned-long-with-fallback",
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: testLimitedUnsignedLongWithFallback.fromAttribute,
      },
    };
    get test() {
      return this[TEST] ?? testLimitedUnsignedLongWithFallback.defaultValue;
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
customElements.define(
  "test-clamped-unsigned-long",
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: testClampedUnsignedLong.fromAttribute,
      },
    };
    get test() {
      return this[TEST] ?? testClampedUnsignedLong.defaultValue;
    }
    set test(value) {
      value = testClampedUnsignedLong.coerceValue(value);
      testClampedUnsignedLong.setAttribute(this, "test", value);
    }
  },
);
const testDouble = reflectDouble();
customElements.define(
  "test-double",
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: testDouble.fromAttribute,
      },
    };
    get test() {
      return this[TEST] ?? testDouble.defaultValue;
    }
    set test(value) {
      value = testDouble.coerceValue(value);
      testDouble.setAttribute(this, "test", value);
    }
  },
);
const testLimitedDouble = reflectPositiveDouble();
customElements.define(
  "test-limited-double",
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: testLimitedDouble.fromAttribute,
      },
    };
    get test() {
      return this[TEST] ?? testLimitedDouble.defaultValue;
    }
    set test(value) {
      value = testLimitedDouble.coerceValue(value);
      testLimitedDouble.setAttribute(this, "test", value);
    }
  },
);

runTests();
