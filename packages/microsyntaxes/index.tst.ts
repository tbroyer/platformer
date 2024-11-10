import { expect } from "tstyche";
import {
  enumerated,
  EnumeratedAttributeOptions,
} from "@platformer/microsyntaxes";

expect({
  keywords: ["", "one", "two", "three"],
  aliases: { empty: "", un: "one", deux: "two", trois: "three" },
} satisfies EnumeratedAttributeOptions<
  "" | "one" | "two" | "three",
  "empty" | "un" | "deux" | "trois"
>).type.not.toRaiseError();

expect(
  enumerated({
    keywords: ["", "one", "two", "three", "missing", "invalid"],
    aliases: { empty: "", un: "one", deux: "two", trois: "three" },
    missing: "missing",
    invalid: "invalid",
  }),
).type.not.toRaiseError();

expect(
  enumerated({
    keywords: ["", "one", "two", "three"],
    aliases: { quatre: "four" },
  }),
).type.toRaiseError(
  `Type '"four"' is not assignable to type '"" | "one" | "two" | "three"'`,
);
expect(
  enumerated({
    keywords: ["", "one", "two", "three"],
    aliases: { one: "un" },
  }),
).type.toRaiseError(
  `Type 'string' is not assignable to type '["Error: alias is a known keyword"]`,
);

expect(
  enumerated({
    keywords: ["", "one", "two", "three"],
    invalid: "not-in-keywords",
  }),
).type.toRaiseError(
  `Type '"not-in-keywords"' is not assignable to type '"" | "one" | "two" | "three" | undefined'`,
);
expect(
  enumerated({
    keywords: ["", "one", "two", "three"],
    missing: "not-in-keywords",
  }),
).type.toRaiseError(
  `Type '"not-in-keywords"' is not assignable to type '"" | "one" | "two" | "three" | undefined'`,
);
