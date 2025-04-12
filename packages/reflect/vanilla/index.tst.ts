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
} from "@webfeet/reflect-vanilla";

type EnumKeyword = "" | "one" | "two" | "three" | "missing" | "invalid";
type NullableEnumKeyword = "use-credentials" | "anonymous";

class AllDecorators extends HTMLElement {
  @(expect(reflectString()).type.toBeApplicable)
  accessor str: string = "";

  @(expect(reflectURL()).type.toBeApplicable)
  accessor url: string = "";

  @(expect(
    reflectEnum({
      keywords: ["", "one", "two", "three", "missing", "invalid"],
      aliases: { empty: "", un: "one", deux: "two", trois: "three" },
      missing: "missing",
      invalid: "invalid",
    }),
  ).type.toBeApplicable)
  accessor enum: EnumKeyword = "";

  @(expect(
    reflectNullableEnum({
      keywords: ["use-credentials", "anonymous"],
      invalid: "anonymous",
    }),
  ).type.toBeApplicable)
  accessor nullableEnum: NullableEnumKeyword | null = null;

  @(expect(reflectBoolean()).type.toBeApplicable)
  accessor bool: boolean = false;

  @(expect(reflectInt({ defaultValue: 42 })).type.toBeApplicable)
  accessor int: number = 42;

  @(expect(reflectNonNegativeInt()).type.toBeApplicable)
  accessor nonNegativeInt: number = 0;

  @(expect(reflectUnsignedInt({ defaultValue: 42 })).type.toBeApplicable)
  accessor unsignedInt: number = 42;

  @(expect(reflectPositiveInt()).type.toBeApplicable)
  accessor positiveInt: number = 1;

  @(expect(reflectPositiveIntWithFallback()).type.toBeApplicable)
  accessor positiveIntWithFallback: number = 1;

  @(expect(reflectClampedInt({ min: 42, defaultValue: 100, max: 1337 })).type
    .toBeApplicable)
  accessor clampedInt: number = 100;

  @(expect(reflectDouble()).type.toBeApplicable)
  accessor double: number = 0;

  @(expect(reflectPositiveDouble({ defaultValue: 1.0 })).type.toBeApplicable)
  accessor positiveDouble: number = 1.0;
}

class WrongType extends HTMLElement {
  @(expect(reflectString()).type.not.toBeApplicable)
  accessor nullable: string | undefined;

  @(expect(reflectString()).type.not.toBeApplicable)
  accessor number_: number = 0;

  @(expect(reflectString()).type.not.toBeApplicable)
  accessor enum_: EnumKeyword = "";

  @(expect(reflectURL()).type.not.toBeApplicable)
  set urlSetter(value: string) {}
}

class NonHTMLElement {
  @(expect(reflectString()).type.not.toBeApplicable)
  accessor nonHTMLElement: string = "";
}
@(expect(reflectString()).type.not.toBeApplicable)
class WrongLocation extends HTMLElement {
  @(expect(reflectString()).type.not.toBeApplicable)
  nonAccessor: string = "";

  @(expect(reflectString()).type.not.toBeApplicable)
  get stringGetter(): string {
    return "";
  }

  @(expect(reflectString()).type.not.toBeApplicable)
  set stringSetter(value: string) {}

  @(expect(reflectString()).type.not.toBeApplicable)
  nonProperty(value: string) {}
}

// TODO: enum options, clampedInt options
