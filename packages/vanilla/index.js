import { runTests } from "@ce-reflection-tests/harness";
import webidl from "webidl-conversions";

customElements.define(
  "test-string",
  class extends HTMLElement {
    get test() {
      return this.getAttribute("test") ?? "";
    }
    set test(value) {
      value = webidl["DOMString"](value);
      this.setAttribute("test", value);
    }
  },
);

// TODO: URL, enum, nullable enum

customElements.define(
  "test-boolean",
  class extends HTMLElement {
    get test() {
      return this.hasAttribute("test");
    }
    set test(value) {
      value = webidl["boolean"](value);
      this.toggleAttribute("test", value);
    }
  },
);

// Copied from Gecko's reflectInt
function stringToInteger(value, nonNegative, defaultValue) {
  // Parse: Ignore leading whitespace, find [+/-][numbers]
  var result = /^[ \t\n\f\r]*([+-]?[0-9]+)/.exec(value);
  if (result) {
    var resultInt = parseInt(result[1], 10);
    if (
      (nonNegative ? 0 : -0x80000000) <= resultInt &&
      resultInt <= 0x7fffffff
    ) {
      // If the value is within allowed value range for signed/unsigned
      // integer, return it -- but add 0 to it to convert a possible -0 into
      // +0, the only zero present in the signed integer range.
      return resultInt + 0;
    }
  }
  return defaultValue;
}

customElements.define(
  "test-long",
  class extends HTMLElement {
    get test() {
      return stringToInteger(this.getAttribute("test") ?? "", false, 42);
    }
    set test(value) {
      value = webidl["long"](value);
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
      value = webidl["long"](value);
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
      value = webidl["unsigned long"](value);
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
      value = webidl["unsigned long"](value);
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
      value = webidl["unsigned long"](value);
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
      value = webidl["unsigned long"](value);
      if (value < 0 || 0x7fffffff < value) {
        value = 100;
      }
      this.setAttribute("test", value);
    }
  },
);
// TODO: double

runTests();
