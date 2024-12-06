import { expect } from "tstyche";
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
  reflectUnsignedInt,
  reflectURL,
} from "@platformer/reflect-vanilla";

type EnumKeyword = "" | "one" | "two" | "three" | "missing" | "invalid";
type NullableEnumKeyword = "use-credentials" | "anonymous";

expect(
  class AllDecorators extends HTMLElement {
    @reflectString() accessor str: string = "";

    @reflectURL() accessor url: string = "";

    @reflectEnum({
      keywords: ["", "one", "two", "three", "missing", "invalid"],
      aliases: { empty: "", un: "one", deux: "two", trois: "three" },
      missing: "missing",
      invalid: "invalid",
    })
    accessor enum: EnumKeyword = "";

    @reflectNullableEnum({
      keywords: ["use-credentials", "anonymous"],
      invalid: "anonymous",
    })
    accessor nullableEnum: NullableEnumKeyword | null = null;

    @reflectBoolean() accessor bool: boolean = false;

    @reflectInt({ defaultValue: 42 }) accessor int: number = 42;

    @reflectNonNegativeInt() accessor nonNegativeInt: number = 0;

    @reflectUnsignedInt({ defaultValue: 42 }) accessor unsignedInt: number = 42;

    @reflectPositiveInt() accessor positiveInt: number = 1;

    @reflectPositiveIntWithFallback() accessor positiveIntWithFallback: number =
      1;

    @reflectClampedInt({ min: 42, defaultValue: 100, max: 1337 })
    accessor clampedInt: number = 100;

    @reflectDouble() accessor double: number = 0;

    @reflectPositiveDouble({ defaultValue: 1.0 })
    accessor positiveDouble: number = 1.0;
  },
).type.not.toRaiseError();

expect(
  class extends HTMLElement {
    @reflectString() accessor nullable: string | undefined;
  },
).type.toRaiseError(1240);
expect(
  class {
    @reflectString() accessor nonHTMLElement: string = "";
  },
).type.toRaiseError(1240, 1270);
expect(
  class extends HTMLElement {
    @reflectString() nonAccessor: string = "";
  },
).type.toRaiseError(1240, 1270);
expect(
  class extends HTMLElement {
    @reflectString() get stringGetter(): string {
      return "";
    }
  },
).type.toRaiseError(1241, 1270);
expect(
  class extends HTMLElement {
    @reflectString() set stringSetter(value: string) {}
  },
).type.toRaiseError(1241, 1270);
expect(
  @reflectString()
  class extends HTMLElement {},
).type.toRaiseError(1238, 1270);
expect(
  class extends HTMLElement {
    @reflectString() nonProperty(value: string) {}
  },
).type.toRaiseError(1241, 1270);
expect(
  class extends HTMLElement {
    @reflectString() accessor wrongType: number = 0;
  },
).type.toRaiseError(1240, 1270);
expect(
  class extends HTMLElement {
    @reflectString() accessor wrongType: EnumKeyword = "";
  },
).type.toRaiseError(1270);

expect(
  class extends HTMLElement {
    @reflectURL() set urlSetter(value: string) {}
  },
).type.toRaiseError(1241, 1270);

// TODO: enum options, clampedInt options
