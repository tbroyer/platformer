import { expect } from "tstyche";
import {
  enumerated,
  type EnumeratedAttributeOptions,
} from "@webfeet/microsyntaxes";

expect({
  keywords: ["", "one", "two", "three"],
  aliases: { empty: "", un: "one", deux: "two", trois: "three" },
} satisfies EnumeratedAttributeOptions<
  "" | "one" | "two" | "three",
  "empty" | "un" | "deux" | "trois"
>).type.not.toRaiseError();

expect(enumerated).type.toBeCallableWith({
  keywords: ["", "one", "two", "three", "missing", "invalid"],
  aliases: { empty: "", un: "one", deux: "two", trois: "three" },
  missing: "missing",
  invalid: "invalid",
});

expect(enumerated).type.not.toBeCallableWith({
  keywords: ["", "one", "two", "three"],
  aliases: { quatre: "four" },
});
expect(enumerated).type.not.toBeCallableWith({
  keywords: ["", "one", "two", "three"],
  aliases: { one: "un" },
});

expect(enumerated).type.not.toBeCallableWith({
  keywords: ["", "one", "two", "three"],
  invalid: "not-in-keywords",
});
expect(enumerated).type.not.toBeCallableWith({
  keywords: ["", "one", "two", "three"],
  missing: "not-in-keywords",
});
