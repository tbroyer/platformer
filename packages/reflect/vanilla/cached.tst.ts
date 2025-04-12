import { expect, test } from "tstyche";
import {
  reflectBoolean,
  reflectClampedInt,
  reflectDouble,
  reflectElementReference,
  reflectElementReferences,
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
} from "@webfeet/reflect-vanilla/cached.js";

type EnumKeyword = "" | "one" | "two" | "three" | "missing" | "invalid";
type NullableEnumKeyword = "use-credentials" | "anonymous";

class AllDecorators extends HTMLElement {
  @(expect(reflectString()).type.toBeApplicable)
  accessor str: string = "";
  @(expect(reflectString()).type.toBeApplicable)
  set strSetter(value: string) {}

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
    reflectEnum({
      keywords: ["", "one", "two", "three", "missing", "invalid"],
      aliases: { empty: "", un: "one", deux: "two", trois: "three" },
      missing: "missing",
      invalid: "invalid",
    }),
  ).type.toBeApplicable)
  set enumSetter(value: EnumKeyword) {}

  @(expect(
    reflectNullableEnum({
      keywords: ["use-credentials", "anonymous"],
      invalid: "anonymous",
    }),
  ).type.toBeApplicable)
  accessor nullableEnum: NullableEnumKeyword | null = null;
  @(expect(
    reflectNullableEnum({
      keywords: ["use-credentials", "anonymous"],
      invalid: "anonymous",
    }),
  ).type.toBeApplicable)
  set nullableEnumSetter(value: NullableEnumKeyword | null) {}

  @(expect(reflectBoolean()).type.toBeApplicable)
  accessor bool: boolean = false;
  @(expect(reflectBoolean()).type.toBeApplicable)
  set boolSetter(value: boolean) {}

  @(expect(reflectInt({ defaultValue: 42 })).type.toBeApplicable)
  accessor int: number = 42;
  @(expect(reflectInt({ defaultValue: 42 })).type.toBeApplicable)
  set intSetter(value: number) {}

  @(expect(reflectNonNegativeInt()).type.toBeApplicable)
  accessor nonNegativeInt: number = 0;
  @(expect(reflectNonNegativeInt()).type.toBeApplicable)
  set nonNegativeIntSetter(value: number) {}

  @(expect(reflectUnsignedInt({ defaultValue: 42 })).type.toBeApplicable)
  accessor unsignedInt: number = 42;
  @(expect(reflectUnsignedInt({ defaultValue: 42 })).type.toBeApplicable)
  set unsignedIntSetter(value: number) {}

  @(expect(reflectPositiveInt()).type.toBeApplicable)
  accessor positiveInt: number = 1;
  @(expect(reflectPositiveInt()).type.toBeApplicable)
  set positiveIntSetter(value: number) {}

  @(expect(reflectPositiveIntWithFallback()).type.toBeApplicable)
  accessor positiveIntWithFallback: number = 1;
  @(expect(reflectPositiveIntWithFallback()).type.toBeApplicable)
  set positiveIntWithFallbackSetter(value: number) {}

  @(expect(reflectClampedInt({ min: 42, defaultValue: 100, max: 1337 })).type
    .toBeApplicable)
  accessor clampedInt: number = 100;
  @(expect(reflectClampedInt({ min: 42, defaultValue: 100, max: 1337 })).type
    .toBeApplicable)
  set clampedIntSetter(value: number) {}

  @(expect(reflectDouble()).type.toBeApplicable)
  accessor double: number = 0;
  @(expect(reflectDouble()).type.toBeApplicable)
  set doubleSetter(value: number) {}

  @(expect(reflectPositiveDouble({ defaultValue: 1.0 })).type.toBeApplicable)
  accessor positiveDouble: number = 1.0;
  @(expect(reflectPositiveDouble({ defaultValue: 1.0 })).type.toBeApplicable)
  set positiveDoubleSetter(value: number) {}

  @(expect(reflectElementReference()).type.toBeApplicable)
  accessor refElement: Element | null = null;
  @(expect(reflectElementReference({ type: HTMLButtonElement })).type
    .toBeApplicable)
  accessor buttonElement: HTMLButtonElement | null = null;

  @(expect(reflectElementReferences()).type.toBeApplicable)
  accessor refElements: ReadonlyArray<Element> | null = null;
  @(expect(reflectElementReferences({ type: HTMLButtonElement })).type
    .toBeApplicable)
  accessor buttonElements: ReadonlyArray<HTMLButtonElement> | null = null;
}

test("wrong accessor type", () => {
  class WrongType extends HTMLElement {
    @(expect(reflectString()).type.not.toBeApplicable)
    accessor nullable: string | undefined;

    @(expect(reflectString()).type.not.toBeApplicable)
    accessor number_: number = 0;

    @(expect(reflectString()).type.not.toBeApplicable)
    accessor enum_: EnumKeyword = "";
  }
});
test("wrong decorated location", () => {
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
    nonProperty(value: string) {}

    @(expect(reflectURL()).type.not.toBeApplicable)
    set urlSetter(value: string) {}
  }
});

// TODO: enum options, clampedInt options
