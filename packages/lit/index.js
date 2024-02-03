import { runTests } from "@ce-reflection-tests/harness";
import {
  stringToInteger,
  stringToDouble,
  webidl,
} from "@ce-reflection-tests/helpers";
import { LitElement } from "lit";

const TEST = Symbol();

customElements.define(
  "test-string",
  class extends LitElement {
    static properties = {
      [TEST]: { attribute: "test" },
    };
    get test() {
      return this[TEST] ?? "";
    }
    set test(value) {
      value = webidl["DOMString"](value);
      this.setAttribute("test", value);
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
      let value = this[TEST];
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

// TODO: enum, nullable enum

customElements.define(
  "test-boolean",
  class extends LitElement {
    static properties = {
      test: { type: Boolean },
    };
    #test = false;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = webidl["boolean"](value);
      this.#test = value;
      this.toggleAttribute("test", value);
    }
  },
);

customElements.define(
  "test-long",
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: (value) => stringToInteger(value ?? "", false, 42),
      },
    };
    get test() {
      return this[TEST] ?? 42;
    }
    set test(value) {
      value = webidl["long"](value);
      this.setAttribute("test", value);
    }
  },
);
customElements.define(
  "test-limited-long",
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: (value) => stringToInteger(value ?? "", true, -1),
      },
    };
    get test() {
      return this[TEST] ?? -1;
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
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: (value) => stringToInteger(value ?? "", true, 42),
      },
    };
    get test() {
      return this[TEST] ?? 42;
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
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter(value) {
          value = stringToInteger(value ?? "", true, 1);
          return value <= 0 ? 1 : value;
        },
      },
    };
    get test() {
      return this[TEST] ?? 1;
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
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter(value) {
          value = stringToInteger(value ?? "", true, 1);
          return value <= 0 ? 1 : value;
        },
      },
    };
    get test() {
      return this[TEST] ?? 1;
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
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter(value) {
          let result = /^[ \t\n\f\r]*([+-]?[0-9]+)/.exec(value ?? "");
          if (result) {
            var resultInt = parseInt(result[1], 10);
            if (resultInt >= 0) {
              return Math.max(42, Math.min(resultInt, 1337));
            }
          }
          return 100;
        },
      },
    };
    get test() {
      return this[TEST] ?? 100;
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
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: (value) => stringToDouble(value ?? "", false, 0.0),
      },
    };
    get test() {
      return this[TEST] ?? 0.0;
    }
    set test(value) {
      value = webidl["double"](value);
      this.setAttribute("test", value);
    }
  },
);
customElements.define(
  "test-limited-double",
  class extends LitElement {
    static properties = {
      [TEST]: {
        attribute: "test",
        converter: (value) => stringToDouble(value ?? "", true, 1.0),
      },
    };
    get test() {
      return this[TEST] ?? 1.0;
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
