import { runTests } from "@ce-reflection-tests/harness";
import {
  stringToInteger,
  stringToDouble,
  toASCIILowerCase,
  webidl,
} from "@ce-reflection-tests/helpers";
import { DOM, FASTElement } from "@microsoft/fast-element";

FASTElement.define(
  class extends FASTElement {
    static definition = {
      name: "test-string",
      attributes: [{ property: "_test", attribute: "test", mode: "fromView" }],
    };
    get test() {
      return this._test ?? "";
    }
    set test(value) {
      value = webidl["DOMString"](value);
      this.setAttribute("test", value);
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
      let value = this._test;
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
            fromView(value) {
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
            },
          },
        },
      ],
    };
    get test() {
      return this._test ?? "missing";
    }
    set test(value) {
      value = webidl["DOMString"](value);
      this.setAttribute("test", value);
    }
  },
);
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
            fromView(value) {
              if (value == null) {
                return null;
              }
              switch (toASCIILowerCase(value)) {
                case "use-credentials":
                  return "use-credentials";
                default:
                  return "anonymous";
              }
            },
          },
        },
      ],
    };
    get test() {
      return this._test ?? null;
    }
    set test(value) {
      if (value != null) {
        value = webidl["DOMString"](value);
      }
      DOM.setAttribute(this, "test", value);
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
          converter: {
            fromView(value) {
              return value != null;
            },
          },
        },
      ],
    };
    get test() {
      return this._test ?? false;
    }
    set test(value) {
      value = webidl["boolean"](value);
      this.toggleAttribute("test", value);
    }
  },
);

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
            fromView: (value) => stringToInteger(value ?? "", false, 42),
          },
        },
      ],
    };
    get test() {
      return this._test ?? 42;
    }
    set test(value) {
      value = webidl["long"](value);
      this.setAttribute("test", value);
    }
  },
);
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
            fromView: (value) => stringToInteger(value ?? "", true, -1),
          },
        },
      ],
    };
    get test() {
      return this._test ?? -1;
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
            fromView: (value) => stringToInteger(value ?? "", true, 42),
          },
        },
      ],
    };
    get test() {
      return this._test ?? 42;
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
            fromView(value) {
              value = stringToInteger(value ?? "", true, 1);
              return value <= 0 ? 1 : value;
            },
          },
        },
      ],
    };
    get test() {
      return this._test ?? 1;
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
            fromView(value) {
              value = stringToInteger(value ?? "", true, 1);
              return value <= 0 ? 1 : value;
            },
          },
        },
      ],
    };
    get test() {
      return this._test ?? 1;
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
            fromView(value) {
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
        },
      ],
    };
    get test() {
      return this._test ?? 100;
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
            fromView: (value) => stringToDouble(value ?? "", false, 0.0),
          },
        },
      ],
    };
    get test() {
      return this._test ?? 0.0;
    }
    set test(value) {
      value = webidl["double"](value);
      this.setAttribute("test", value);
    }
  },
);
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
            fromView: (value) => stringToDouble(value ?? "", true, 1.0),
          },
        },
      ],
    };
    get test() {
      return this._test ?? 1.0;
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
