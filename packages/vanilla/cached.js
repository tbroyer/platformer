import { runTests } from "@ce-reflection-tests/harness";
import webidl from "webidl-conversions";

customElements.define(
  "test-string",
  class extends HTMLElement {
    #test = "";
    get test() {
      return this.#test;
    }
    set test(value) {
      value = webidl["DOMString"](value);
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = newValue ?? "";
    }
  },
);

// TODO: URL, enum, nullable enum

customElements.define(
  "test-boolean",
  class extends HTMLElement {
    #test = false;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = webidl["boolean"](value);
      this.toggleAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = newValue != null;
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

function stringToDouble(value, onlyPositive, defaultValue) {
  var result = /^[ \t\n\f\r]*([0-9.eE+-]+)/.exec(value);
  if (result) {
    var resultFloat = parseFloat(result[1]);
    if (!Number.isNaN(resultFloat) && (!onlyPositive || resultFloat > 0)) {
      return resultFloat;
    }
  }
  return defaultValue;
}

customElements.define(
  "test-long",
  class extends HTMLElement {
    #test = 42;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = webidl["long"](value);
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = stringToInteger(newValue ?? "", false, 42);
    }
  },
);
customElements.define(
  "test-limited-long",
  class extends HTMLElement {
    #test = -1;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = webidl["long"](value);
      if (value < 0) {
        throw new DOMException("", "IndexSizeError");
      }
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = stringToInteger(newValue ?? "", true, -1);
    }
  },
);
customElements.define(
  "test-unsigned-long",
  class extends HTMLElement {
    #test = 42;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = webidl["unsigned long"](value);
      if (value < 0 || 0x7fffffff < value) {
        value = 42;
      }
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = stringToInteger(newValue ?? "", true, 42);
    }
  },
);
customElements.define(
  "test-limited-unsigned-long",
  class extends HTMLElement {
    #test = 1;
    get test() {
      return this.#test;
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
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      let value = stringToInteger(newValue ?? "", true, 1);
      this.#test = value <= 0 ? 1 : value;
    }
  },
);
customElements.define(
  "test-limited-unsigned-long-with-fallback",
  class extends HTMLElement {
    #test = 1;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = webidl["unsigned long"](value);
      if (value < 1 || 0x7fffffff < value) {
        value = 1;
      }
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      let value = stringToInteger(newValue ?? "", true, 1);
      this.#test = value <= 0 ? 1 : value;
    }
  },
);
customElements.define(
  "test-clamped-unsigned-long",
  class extends HTMLElement {
    #test = 100;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = webidl["unsigned long"](value);
      if (value < 0 || 0x7fffffff < value) {
        value = 100;
      }
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = this.#parseClampedInt(newValue ?? "");
    }
    #parseClampedInt(value) {
      let result = /^[ \t\n\f\r]*([+-]?[0-9]+)/.exec(value);
      if (result) {
        let resultInt = parseInt(result[1], 10);
        if (resultInt >= 0) {
          return Math.max(42, Math.min(resultInt, 1337));
        }
      }
      return 100;
    }
  },
);
customElements.define(
  "test-double",
  class extends HTMLElement {
    #test = 0.0;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = webidl["double"](value);
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = stringToDouble(newValue ?? "", false, 0.0);
    }
  },
);
customElements.define(
  "test-limited-double",
  class extends HTMLElement {
    #test = 1.0;
    get test() {
      return this.#test;
    }
    set test(value) {
      value = webidl["double"](value);
      if (value <= 0) {
        return;
      }
      this.setAttribute("test", value);
    }
    static observedAttributes = ["test"];
    attributeChangedCallback(name, oldValue, newValue) {
      this.#test = stringToDouble(newValue ?? "", true, 1.0);
    }
  },
);

runTests();