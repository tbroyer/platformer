import { expect, test } from "tstyche";
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
} from "@platformer/reflect-types";

type EnumKeyword = "" | "one" | "two" | "three" | "missing" | "invalid";
type NullableEnumKeyword = "use-credentials" | "anonymous";

expect(
  class AllDecorators extends HTMLElement {
    @reflectString() accessor str: string = "";
    @reflectString() set strSetter(value: string) {}

    @reflectURL() accessor url: string = "";

    @reflectEnum({
      keywords: ["", "one", "two", "three", "missing", "invalid"],
      aliases: { empty: "", un: "one", deux: "two", trois: "three" },
      missing: "missing",
      invalid: "invalid",
    })
    accessor enum: EnumKeyword = "";
    @reflectEnum({
      keywords: ["", "one", "two", "three", "missing", "invalid"],
      aliases: { empty: "", un: "one", deux: "two", trois: "three" },
      missing: "missing",
      invalid: "invalid",
    })
    set enumSetter(value: EnumKeyword) {}

    @reflectNullableEnum({
      keywords: ["use-credentials", "anonymous"],
      invalid: "anonymous",
    })
    accessor nullableEnum: NullableEnumKeyword | null = null;
    @reflectNullableEnum({
      keywords: ["use-credentials", "anonymous"],
      invalid: "anonymous",
    })
    set nullableEnumSetter(value: NullableEnumKeyword | null) {}

    @reflectBoolean() accessor bool: boolean = false;
    @reflectBoolean() set boolSetter(value: boolean) {}

    @reflectInt({ defaultValue: 42 }) accessor int: number = 42;
    @reflectInt({ defaultValue: 42 }) set intSetter(value: number) {}

    @reflectNonNegativeInt() accessor nonNegativeInt: number = 0;
    @reflectNonNegativeInt() set nonNegativeIntSetter(value: number) {}

    @reflectUnsignedInt({ defaultValue: 42 }) accessor unsignedInt: number = 42;
    @reflectUnsignedInt({ defaultValue: 42 })
    set unsignedIntSetter(value: number) {}

    @reflectPositiveInt() accessor positiveInt: number = 1;
    @reflectPositiveInt() set positiveIntSetter(value: number) {}

    @reflectPositiveIntWithFallback()
    accessor positiveIntWithFallback: number = 1;
    @reflectPositiveIntWithFallback()
    set positiveIntWithFallbackSetter(value: number) {}

    @reflectClampedInt({ min: 42, defaultValue: 100, max: 1337 })
    accessor clampedInt: number = 100;
    @reflectClampedInt({ min: 42, defaultValue: 100, max: 1337 })
    set clampedIntSetter(value: number) {}

    @reflectDouble() accessor double: number = 0;
    @reflectDouble() set doubleSetter(value: number) {}

    @reflectPositiveDouble({ defaultValue: 1.0 })
    accessor positiveDouble: number = 1.0;
    @reflectPositiveDouble({ defaultValue: 1.0 })
    set positiveDoubleSetter(value: number) {}
  },
).type.not.toRaiseError();

test("wrong accessor type", () => {
  expect(
    class extends HTMLElement {
      @reflectString() accessor nullable: string | undefined;
    },
  ).type.toRaiseError(1240, 1270);
  expect(
    class {
      @reflectString() accessor nonHTMLElement: string = "";
    },
  ).type.toRaiseError(1240, 1270);
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
});
test("wrong decorated location", () => {
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
    @reflectString()
    class extends HTMLElement {},
  ).type.toRaiseError(1238, 1270);
  expect(
    class extends HTMLElement {
      @reflectString() nonProperty(value: string) {}
    },
  ).type.toRaiseError(1241);
  expect(
    class extends HTMLElement {
      @reflectURL() set urlSetter(value: string) {}
    },
  ).type.toRaiseError(1241, 1270);
});

// TODO: enum options, clampedInt options
