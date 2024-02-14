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

customElements.define(
  "test-string",
  class extends HTMLElement {
    #test = reflectString.defaultValue;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = reflectString.coerceValue(value);
      reflectString.setAttribute(this, "test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = reflectString.fromAttribute(newValue);
    }
  },
);

customElements.define(
  "test-url",
  class extends HTMLElement {
    #test = null;
    get test() {
      return reflectURL.fromAttribute(this, this.#test);
    }
    set test(value) {
      value = reflectURL.coerceValue(value);
      reflectURL.setAttribute(this, "test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = newValue;
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
  class extends HTMLElement {
    #test = testEnum.defaultValue;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = testEnum.coerceValue(value);
      testEnum.setAttribute(this, "test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = testEnum.fromAttribute(newValue);
    }
  },
);
const testNullableEnum = reflectNullableEnum({
  keywords: ["use-credentials", "anonymous"],
  invalid: "anonymous",
});
customElements.define(
  "test-nullable-enum",
  class extends HTMLElement {
    #test = testNullableEnum.defaultValue;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = testNullableEnum.coerceValue(value);
      testNullableEnum.setAttribute(this, "test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = testNullableEnum.fromAttribute(newValue);
    }
  },
);

customElements.define(
  "test-boolean",
  class extends HTMLElement {
    #test = reflectBoolean.defaultValue;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = reflectBoolean.coerceValue(value);
      reflectBoolean.setAttribute(this, "test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = reflectBoolean.fromAttribute(newValue);
    }
  },
);

customElements.define(
  "test-long",
  class extends HTMLElement {
    #reflectInt = reflectInt({ defaultValue: 42 });
    #test = this.#reflectInt.defaultValue;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = this.#reflectInt.coerceValue(value);
      this.#reflectInt.setAttribute(this, "test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = this.#reflectInt.fromAttribute(newValue);
    }
  },
);
customElements.define(
  "test-limited-long",
  class extends HTMLElement {
    #reflectInt = reflectNonNegativeInt();
    #test = this.#reflectInt.defaultValue;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = this.#reflectInt.coerceValue(value);
      this.#reflectInt.setAttribute(this, "test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = this.#reflectInt.fromAttribute(newValue);
    }
  },
);
customElements.define(
  "test-unsigned-long",
  class extends HTMLElement {
    #reflectInt = reflectUnsignedInt({ defaultValue: 42 });
    #test = this.#reflectInt.defaultValue;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = this.#reflectInt.coerceValue(value);
      this.#reflectInt.setAttribute(this, "test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = this.#reflectInt.fromAttribute(newValue);
    }
  },
);
customElements.define(
  "test-limited-unsigned-long",
  class extends HTMLElement {
    #reflectInt = reflectPositiveInt();
    #test = this.#reflectInt.defaultValue;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = this.#reflectInt.coerceValue(value);
      this.#reflectInt.setAttribute(this, "test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = this.#reflectInt.fromAttribute(newValue);
    }
  },
);
customElements.define(
  "test-limited-unsigned-long-with-fallback",
  class extends HTMLElement {
    #reflectInt = reflectPositiveIntWithFallback();
    #test = this.#reflectInt.defaultValue;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = this.#reflectInt.coerceValue(value);
      this.#reflectInt.setAttribute(this, "test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = this.#reflectInt.fromAttribute(newValue);
    }
  },
);
customElements.define(
  "test-clamped-unsigned-long",
  class extends HTMLElement {
    #reflectInt = reflectClampedInt({
      min: 42,
      defaultValue: 100,
      max: 1337,
    });
    #test = this.#reflectInt.defaultValue;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = this.#reflectInt.coerceValue(value);
      this.#reflectInt.setAttribute(this, "test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = this.#reflectInt.fromAttribute(newValue);
    }
  },
);
customElements.define(
  "test-double",
  class extends HTMLElement {
    #reflectDouble = reflectDouble();
    #test = this.#reflectDouble.defaultValue;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = this.#reflectDouble.coerceValue(value);
      this.#reflectDouble.setAttribute(this, "test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = this.#reflectDouble.fromAttribute(newValue);
    }
  },
);
customElements.define(
  "test-limited-double",
  class extends HTMLElement {
    #reflectDouble = reflectPositiveDouble();
    #test = this.#reflectDouble.defaultValue;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = this.#reflectDouble.coerceValue(value);
      this.#reflectDouble.setAttribute(this, "test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = this.#reflectDouble.fromAttribute(newValue);
    }
  },
);

runTests();
