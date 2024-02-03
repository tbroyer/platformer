import {
  reflectBoolean,
  reflectInt,
  reflectLimitedEnumerated,
  reflectString,
  reflectURL,
  reflectUnsignedInt,
} from "./gecko.js";
import { reflects } from "./wpt.js";

export function runTests() {
  suite("string", () => {
    test("with Gecko harness", () => {
      reflectString({
        element: document.createElement("test-string"),
        attribute: "test",
      });
    });
    test("with WPT harness", () => {
      reflects("string", "test", "test-string");
    });
  });
  suite("url", () => {
    test("with Gecko harness", () => {
      reflectURL({
        element: document.createElement("test-url"),
        attribute: "test",
      });
    });
    test("with WPT harness", () => {
      reflects("url", "test", "test-url");
    });
  });
  // TODO: enum, nullable enum
  suite("boolean", () => {
    test("with Gecko harness", () => {
      reflectBoolean({
        element: document.createElement("test-boolean"),
        attribute: "test",
      });
    });
    test("with WPT harness", () => {
      reflects("boolean", "test", "test-boolean");
    });
  });
  suite("long", () => {
    test("with Gecko harness", () => {
      reflectInt({
        element: document.createElement("test-long"),
        attribute: "test",
        defaultValue: 42,
      });
    });
    test("with WPT harness", () => {
      reflects({ type: "long", defaultVal: 42 }, "test", "test-long");
    });
  });
  suite("limited long", () => {
    test("with Gecko harness", () => {
      reflectInt({
        element: document.createElement("test-limited-long"),
        attribute: "test",
        nonNegative: true,
      });
    });
    test("with WPT harness", () => {
      reflects("limited long", "test", "test-limited-long");
    });
  });
  suite("unsigned long", () => {
    test("with Gecko harness", () => {
      reflectUnsignedInt({
        element: document.createElement("test-unsigned-long"),
        attribute: "test",
        defaultValue: 42,
      });
    });
    test("with WPT harness", () => {
      reflects(
        { type: "unsigned long", defaultVal: 42 },
        "test",
        "test-unsigned-long",
      );
    });
  });
  suite("limited unsigned long", () => {
    test("with Gecko harness", () => {
      reflectUnsignedInt({
        element: document.createElement("test-limited-unsigned-long"),
        attribute: "test",
        nonZero: true,
      });
    });
    test("with WPT harness", () => {
      reflects("limited unsigned long", "test", "test-limited-unsigned-long");
    });
  });
  suite("limited unsigned long with fallback", () => {
    test("with Gecko harness", () => {
      reflectUnsignedInt({
        element: document.createElement(
          "test-limited-unsigned-long-with-fallback",
        ),
        attribute: "test",
        nonZero: true,
        fallback: true,
      });
    });
    test("with WPT harness", () => {
      reflects(
        "limited unsigned long",
        "test",
        "test-limited-unsigned-long-with-fallback",
      );
    });
  });
  suite("clamped unsigned long", () => {
    // XXX: not in Gecko?
    test("with WPT harness", () => {
      reflects(
        { type: "clamped unsigned long", min: 42, max: 1337, defaultVal: 100 },
        "test",
        "test-clamped-unsigned-long",
      );
    });
  });
  suite("double", () => {
    test("with WPT harness", () => {
      reflects("double", "test", "test-double");
    });
  });
  suite("limited double", () => {
    test("with WPT harness", () => {
      reflects(
        { type: "limited double", defaultVal: 1.0 },
        "test",
        "test-limited-double",
      );
    });
  });
}
