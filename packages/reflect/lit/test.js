import { runTests } from "@platformer/reflect-harness";
import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";
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
} from "@platformer/reflect-lit";

/* eslint-disable no-unused-vars */

@customElement("test-string")
class TestString extends LitElement {
  @reflectString() accessor test;
}

@customElement("test-url")
class TestURL extends LitElement {
  @reflectURL() accessor test;
}

@customElement("test-enum")
class TestEnum extends LitElement {
  @reflectEnum({
    keywords: ["", "one", "two", "three", "missing", "invalid"],
    aliases: { empty: "", un: "one", deux: "two", trois: "three" },
    missing: "missing",
    invalid: "invalid",
  })
  accessor test;
}
@customElement("test-nullable-enum")
class TestNullableEnum extends LitElement {
  @reflectNullableEnum({
    keywords: ["use-credentials", "anonymous"],
    invalid: "anonymous",
  })
  accessor test;
}

@customElement("test-boolean")
class TestBoolean extends LitElement {
  @reflectBoolean() accessor test;
}

@customElement("test-long")
class TestLong extends LitElement {
  @reflectInt({ defaultValue: 42 }) accessor test;
}
@customElement("test-limited-long")
class TestLimitedLong extends LitElement {
  @reflectNonNegativeInt() accessor test;
}
@customElement("test-unsigned-long")
class TestUnsignedLong extends LitElement {
  @reflectUnsignedInt({ defaultValue: 42 }) accessor test;
}
@customElement("test-limited-unsigned-long")
class TestLimitedUnsignedLong extends LitElement {
  @reflectPositiveInt() accessor test;
}
@customElement("test-limited-unsigned-long-with-fallback")
class TestLimitedUnsignedLongWithFallback extends LitElement {
  @reflectPositiveIntWithFallback() accessor test;
}
@customElement("test-clamped-unsigned-long")
class TestClampedUnsignedLong extends LitElement {
  @reflectClampedInt({
    min: 42,
    defaultValue: 100,
    max: 1337,
  })
  accessor test;
}
@customElement("test-double")
class TestDouble extends LitElement {
  @reflectDouble() accessor test;
}
@customElement("test-limited-double")
class TestLimitedDouble extends LitElement {
  @reflectPositiveDouble() accessor test;
}

runTests();
