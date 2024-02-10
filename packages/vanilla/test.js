import { runTests } from "@platformer/harness";
import {
  coerceToBoolean,
  coerceToDOMString,
  coerceToDouble,
  coerceToLong,
  coerceToUnsignedLong,
  coerceToUSVString,
  stringToInteger,
  stringToDouble,
  toASCIILowerCase,
} from "@platformer/helpers";

customElements.define(
  "test-string",
  class extends HTMLElement {
    get test() {
      return this.getAttribute("test") ?? "";
    }
    set test(value) {
      value = coerceToDOMString(value);
      this.setAttribute("test", value);
    }
  },
);

customElements.define(
  "test-url",
  class extends HTMLElement {
    get test() {
      let value = this.getAttribute("test");
      if (value == null) {
        return "";
      }
      try {
        return new URL(value, this.ownerDocument.baseURI).toString();
      } catch (e) {
        return value;
      }
    }
    set test(value) {
      value = coerceToUSVString(value);
      this.setAttribute("test", value);
    }
  },
);

customElements.define(
  "test-enum",
  class extends HTMLElement {
    get test() {
      let value = this.getAttribute("test");
      if (value == null) {
        return "missing";
      }
      switch (toASCIILowerCase(value)) {
        case "":
        case "empty":
          return "";
        case "one":
        case "un":
          return "one";
        case "two":
        case "deux":
          return "two";
        case "three":
        case "trois":
          return "three";
        case "missing":
          return "missing";
        default:
          return "invalid";
      }
    }
    set test(value) {
      value = coerceToDOMString(value);
      this.setAttribute("test", value);
    }
  },
);
customElements.define(
  "test-nullable-enum",
  class extends HTMLElement {
    get test() {
      let value = this.getAttribute("test");
      if (value == null) {
        return null; // No CORS
      }
      switch (toASCIILowerCase(value)) {
        case "use-credentials":
          return "use-credentials";
        default:
          return "anonymous";
      }
    }
    set test(value) {
      if (value == null) {
        this.removeAttribute("test");
      } else {
        value = coerceToDOMString(value);
        this.setAttribute("test", value);
      }
    }
  },
);

customElements.define(
  "test-boolean",
  class extends HTMLElement {
    get test() {
      return this.hasAttribute("test");
    }
    set test(value) {
      value = coerceToBoolean(value);
      this.toggleAttribute("test", value);
    }
  },
);

customElements.define(
  "test-long",
  class extends HTMLElement {
    get test() {
      return stringToInteger(this.getAttribute("test") ?? "", false, 42);
    }
    set test(value) {
      value = coerceToLong(value);
      this.setAttribute("test", value);
    }
  },
);
customElements.define(
  "test-limited-long",
  class extends HTMLElement {
    get test() {
      return stringToInteger(this.getAttribute("test") ?? "", true, -1);
    }
    set test(value) {
      value = coerceToLong(value);
      if (value < 0) {
        throw new DOMException("", "IndexSizeError");
      }
      this.setAttribute("test", value);
    }
  },
);
customElements.define(
  "test-unsigned-long",
  class extends HTMLElement {
    get test() {
      return stringToInteger(this.getAttribute("test") ?? "", true, 42);
    }
    set test(value) {
      value = coerceToUnsignedLong(value);
      if (value < 0 || 0x7fffffff < value) {
        value = 42;
      }
      this.setAttribute("test", value);
    }
  },
);
customElements.define(
  "test-limited-unsigned-long",
  class extends HTMLElement {
    get test() {
      let value = stringToInteger(this.getAttribute("test") ?? "", true, 1);
      return value <= 0 ? 1 : value;
    }
    set test(value) {
      value = coerceToUnsignedLong(value);
      if (value === 0) {
        throw new DOMException("", "IndexSizeError");
      }
      if (value < 1 || 0x7fffffff < value) {
        value = 1;
      }
      this.setAttribute("test", value);
    }
  },
);
customElements.define(
  "test-limited-unsigned-long-with-fallback",
  class extends HTMLElement {
    get test() {
      let value = stringToInteger(this.getAttribute("test") ?? "", true, 1);
      return value <= 0 ? 1 : value;
    }
    set test(value) {
      value = coerceToUnsignedLong(value);
      if (value < 1 || 0x7fffffff < value) {
        value = 1;
      }
      this.setAttribute("test", value);
    }
  },
);
customElements.define(
  "test-clamped-unsigned-long",
  class extends HTMLElement {
    get test() {
      let result = /^[ \t\n\f\r]*([+-]?[0-9]+)/.exec(
        this.getAttribute("test") ?? "",
      );
      if (result) {
        let resultInt = parseInt(result[1], 10);
        if (resultInt >= 0) {
          return Math.max(42, Math.min(resultInt, 1337));
        }
      }
      return 100;
    }
    set test(value) {
      value = coerceToUnsignedLong(value);
      if (value < 0 || 0x7fffffff < value) {
        value = 100;
      }
      this.setAttribute("test", value);
    }
  },
);
customElements.define(
  "test-double",
  class extends HTMLElement {
    get test() {
      return stringToDouble(this.getAttribute("test") ?? "", false, 0.0);
    }
    set test(value) {
      value = coerceToDouble(value);
      this.setAttribute("test", value);
    }
  },
);
customElements.define(
  "test-limited-double",
  class extends HTMLElement {
    get test() {
      return stringToDouble(this.getAttribute("test") ?? "", true, 1.0);
    }
    set test(value) {
      value = coerceToDouble(value);
      if (value <= 0) {
        return;
      }
      this.setAttribute("test", value);
    }
  },
);

runTests();
