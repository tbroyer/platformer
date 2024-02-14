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
    get test() {
      return reflectString.fromAttribute(this.getAttribute("test"));
    }
    set test(value) {
      value = reflectString.coerceValue(value);
      reflectString.setAttribute(this, "test", value);
    }
  },
);

customElements.define(
  "test-url",
  class extends HTMLElement {
    get test() {
      return reflectURL.fromAttribute(this, this.getAttribute("test"));
    }
    set test(value) {
      value = reflectURL.coerceValue(value);
      reflectURL.setAttribute(this, "test", value);
    }
  },
);

customElements.define(
  "test-enum",
  class extends HTMLElement {
    #reflectEnum = reflectEnum({
      keywords: ["", "one", "two", "three", "missing", "invalid"],
      aliases: { empty: "", un: "one", deux: "two", trois: "three" },
      missing: "missing",
      invalid: "invalid",
    });
    get test() {
      return this.#reflectEnum.fromAttribute(this.getAttribute("test"));
    }
    set test(value) {
      value = this.#reflectEnum.coerceValue(value);
      this.#reflectEnum.setAttribute(this, "test", value);
    }
  },
);
customElements.define(
  "test-nullable-enum",
  class extends HTMLElement {
    #reflectEnum = reflectNullableEnum({
      keywords: ["use-credentials", "anonymous"],
      invalid: "anonymous",
    });
    get test() {
      return this.#reflectEnum.fromAttribute(this.getAttribute("test"));
    }
    set test(value) {
      value = this.#reflectEnum.coerceValue(value);
      this.#reflectEnum.setAttribute(this, "test", value);
    }
  },
);

customElements.define(
  "test-boolean",
  class extends HTMLElement {
    get test() {
      return reflectBoolean.fromAttribute(this.getAttribute("test"));
    }
    set test(value) {
      value = reflectBoolean.coerceValue(value);
      reflectBoolean.setAttribute(this, "test", value);
    }
  },
);

customElements.define(
  "test-long",
  class extends HTMLElement {
    #reflectInt = reflectInt({ defaultValue: 42 });
    get test() {
      return this.#reflectInt.fromAttribute(this.getAttribute("test"));
    }
    set test(value) {
      value = this.#reflectInt.coerceValue(value);
      this.#reflectInt.setAttribute(this, "test", value);
    }
  },
);
customElements.define(
  "test-limited-long",
  class extends HTMLElement {
    #reflectInt = reflectNonNegativeInt();
    get test() {
      return this.#reflectInt.fromAttribute(this.getAttribute("test"));
    }
    set test(value) {
      value = this.#reflectInt.coerceValue(value);
      this.#reflectInt.setAttribute(this, "test", value);
    }
  },
);
customElements.define(
  "test-unsigned-long",
  class extends HTMLElement {
    #reflectInt = reflectUnsignedInt({ defaultValue: 42 });
    get test() {
      return this.#reflectInt.fromAttribute(this.getAttribute("test"));
    }
    set test(value) {
      value = this.#reflectInt.coerceValue(value);
      this.#reflectInt.setAttribute(this, "test", value);
    }
  },
);
customElements.define(
  "test-limited-unsigned-long",
  class extends HTMLElement {
    #reflectInt = reflectPositiveInt();
    get test() {
      return this.#reflectInt.fromAttribute(this.getAttribute("test"));
    }
    set test(value) {
      value = this.#reflectInt.coerceValue(value);
      this.#reflectInt.setAttribute(this, "test", value);
    }
  },
);
customElements.define(
  "test-limited-unsigned-long-with-fallback",
  class extends HTMLElement {
    #reflectInt = reflectPositiveIntWithFallback();
    get test() {
      return this.#reflectInt.fromAttribute(this.getAttribute("test"));
    }
    set test(value) {
      value = this.#reflectInt.coerceValue(value);
      this.#reflectInt.setAttribute(this, "test", value);
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
    get test() {
      return this.#reflectInt.fromAttribute(this.getAttribute("test"));
    }
    set test(value) {
      value = this.#reflectInt.coerceValue(value);
      this.#reflectInt.setAttribute(this, "test", value);
    }
  },
);
customElements.define(
  "test-double",
  class extends HTMLElement {
    #reflectDouble = reflectDouble();
    get test() {
      return this.#reflectDouble.fromAttribute(this.getAttribute("test"));
    }
    set test(value) {
      value = this.#reflectDouble.coerceValue(value);
      this.#reflectDouble.setAttribute(this, "test", value);
    }
  },
);
customElements.define(
  "test-limited-double",
  class extends HTMLElement {
    #reflectDouble = reflectPositiveDouble();
    get test() {
      return this.#reflectDouble.fromAttribute(this.getAttribute("test"));
    }
    set test(value) {
      value = this.#reflectDouble.coerceValue(value);
      this.#reflectDouble.setAttribute(this, "test", value);
    }
  },
);

runTests();
