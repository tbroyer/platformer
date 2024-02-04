import { runTests } from "@ce-reflection-tests/harness";
import {
  stringToInteger,
  stringToDouble,
  toASCIILowerCase,
  webidl,
} from "@ce-reflection-tests/helpers";

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
      value = webidl["USVString"](value);
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
      value = webidl["DOMString"](value);
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
        value = webidl["DOMString"](value);
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
      value = webidl["boolean"](value);
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
customElements.define(
  "test-double",
  class extends HTMLElement {
    get test() {
      return stringToDouble(this.getAttribute("test") ?? "", false, 0.0);
    }
    set test(value) {
      value = webidl["double"](value);
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
      value = webidl["double"](value);
      if (value <= 0) {
        return;
      }
      this.setAttribute("test", value);
    }
  },
);

runTests();
