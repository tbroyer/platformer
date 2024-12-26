import { expect, test } from "tstyche";
import {
  coerceToBoolean,
  coerceToByteString,
  coerceToDOMString,
  coerceToDouble,
  coerceToObject,
} from "@platformer/webidl";
import {
  any,
  bigInt,
  boolean,
  byte,
  byteString,
  callbackFunction,
  clampedByte,
  clampedLong,
  clampedLongLong,
  clampedOctet,
  clampedShort,
  clampedUnsignedLong,
  clampedUnsignedLongLong,
  clampedUnsignedShort,
  domString,
  double,
  enforcedByte,
  enforcedLong,
  enforcedLongLong,
  enforcedOctet,
  enforcedShort,
  enforcedUnsignedLong,
  enforcedUnsignedLongLong,
  enforcedUnsignedShort,
  enumeration,
  float,
  frozenArray,
  interfaceType,
  legacyCallbackFunction,
  long,
  longLong,
  object,
  octet,
  promise,
  record,
  sequence,
  short,
  symbol,
  unrestrictedDouble,
  unrestrictedFloat,
  unsignedLong,
  unsignedLongLong,
  unsignedShort,
  usvString,
} from "@platformer/webidl/decorators.js";

expect(
  class {
    @any accessor any: any;
    @any set anySetter(value: any) {}

    @boolean accessor boolean: boolean;
    @boolean set booleanSetter(value: boolean) {}

    @bigInt accessor bigInt: bigint;
    @bigInt set bigIntSetter(value: bigint) {}

    @domString accessor domString: string;
    @domString set domStringSetter(value: string) {}

    @byteString accessor byteString: string;
    @byteString set byteStringSetter(value: string) {}

    @usvString accessor usvString: string;
    @usvString set usvStringSetter(value: string) {}

    @object accessor object: object;
    @object set objectSetter(value: object) {}

    @symbol accessor symbol: symbol;
    @symbol set symbolSetter(value: symbol) {}

    @interfaceType(HTMLElement) accessor element: HTMLElement;
    @interfaceType(HTMLElement) set elementSetter(value: HTMLElement) {}

    @enumeration<string>(["up", "down", "left", "right"])
    accessor enumeration: string;
    @enumeration<string>("up", "down", "left", "right")
    set enumerationSetter(value: string) {}

    @promise accessor promise: Promise<boolean>;
    @promise set promiseSetter(value: Promise<boolean>) {}

    @callbackFunction accessor callbackFunction: (
      a: number,
      b: string,
    ) => boolean;
    @callbackFunction set callbackFunctionSetter(
      value: (a: number, b: string) => boolean,
    ) {}

    @legacyCallbackFunction accessor legacyCallbackFunction:
      | ((a: number, b: string) => boolean)
      | null;
    @legacyCallbackFunction set legacyCallbackFunctionSetter(
      value: ((a: number, b: string) => boolean) | null,
    ) {}

    @sequence(coerceToDOMString) accessor strings: string[];
    @sequence(coerceToDOMString) set stringsSetter(value: string[]) {}
    @sequence() accessor anys: any[];

    @record(coerceToDouble) accessor record: Record<string, number>;
    @record(coerceToByteString, coerceToBoolean) set recordSetter(
      value: Record<string, boolean>,
    ) {}
    @record() accessor record2: Record<string, boolean>;

    @frozenArray(coerceToDouble) accessor numbers: readonly number[];
    @frozenArray(coerceToDouble) set numbersSetter(value: readonly number[]) {}
    @frozenArray() accessor frozenAnys: readonly any[];

    // byte

    @byte accessor byte: number;
    @byte set byteSetter(value: number) {}

    @clampedByte accessor clampedByte: number;
    @clampedByte set clampedByteSetter(value: number) {}

    @enforcedByte accessor enforcedByte: number;
    @enforcedByte set enforcedByteSetter(value: number) {}

    // octet

    @octet accessor octet: number;
    @octet set octetSetter(value: number) {}

    @clampedOctet accessor clampedOctet: number;
    @clampedOctet set clampedOctetSetter(value: number) {}

    @enforcedOctet accessor enforcedOctet: number;
    @enforcedOctet set enforcedOctetSetter(value: number) {}

    // short

    @short accessor short: number;
    @short set shortSetter(value: number) {}

    @clampedShort accessor clampedShort: number;
    @clampedShort set clampedShortSetter(value: number) {}

    @enforcedShort accessor enforcedShort: number;
    @enforcedShort set enforcedShortSetter(value: number) {}

    // unsignedShort

    @unsignedShort accessor unsignedshort: number;
    @unsignedShort set unsignedshortSetter(value: number) {}

    @clampedUnsignedShort accessor clampedUnsignedShort: number;
    @clampedUnsignedShort set clampedUnsignedShortSetter(value: number) {}

    @enforcedUnsignedShort accessor enforcedUnsignedShort: number;
    @enforcedUnsignedShort set enforcedUnsignedShortSetter(value: number) {}

    // long

    @long accessor long: number;
    @long set longSetter(value: number) {}

    @clampedLong accessor clampedLong: number;
    @clampedLong set clampedLongSetter(value: number) {}

    @enforcedLong accessor enforcedLong: number;
    @enforcedLong set enforcedLongSetter(value: number) {}

    // unsignedLong

    @unsignedLong accessor unsignedlong: number;
    @unsignedLong set unsignedlongSetter(value: number) {}

    @clampedUnsignedLong accessor clampedUnsignedLong: number;
    @clampedUnsignedLong set clampedUnsignedLongSetter(value: number) {}

    @enforcedUnsignedLong accessor enforcedUnsignedLong: number;
    @enforcedUnsignedLong set enforcedUnsignedLongSetter(value: number) {}

    // longlong

    @longLong accessor longLong: number;
    @longLong set longLongSetter(value: number) {}

    @clampedLongLong accessor clampedLongLong: number;
    @clampedLongLong set clampedLongLongSetter(value: number) {}

    @enforcedLongLong accessor enforcedLongLong: number;
    @enforcedLongLong set enforcedLongLongSetter(value: number) {}

    // unsignedLongLong

    @unsignedLongLong accessor unsignedlonglong: number;
    @unsignedLongLong set unsignedlonglongSetter(value: number) {}

    @clampedUnsignedLongLong accessor clampedUnsignedLongLong: number;
    @clampedUnsignedLongLong set clampedUnsignedLongLongSetter(value: number) {}

    @enforcedUnsignedLongLong accessor enforcedUnsignedLongLong: number;
    @enforcedUnsignedLongLong set enforcedUnsignedLongLongSetter(
      value: number,
    ) {}

    // float

    @float accessor float: number;
    @float set floatSetter(value: number) {}

    @unrestrictedFloat accessor unrestrictedFloat: number;
    @unrestrictedFloat set unrestrictedFloatSetter(value: number) {}

    // double

    @double accessor double: number;
    @double set doubleSetter(value: number) {}

    @unrestrictedDouble accessor unrestrictedDouble: number;
    @unrestrictedDouble set unrestrictedDoubleSetter(value: number) {}
  },
).type.not.toRaiseError();

test("subtypes", () => {
  enum NumericEnum {
    Up,
    Down,
    Left,
    Right,
  }
  enum StringEnum {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
  }
  const enum ConstNumericEnum {
    Up,
    Down,
    Left,
    Right,
  }
  const enum ConstStringEnum {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
  }

  expect(
    class {
      @bigInt accessor bigInt: 1n | 42n;
      @bigInt set bigIntSetter(value: 1n | 42n) {}

      @domString accessor domString: StringEnum;
      @domString set domStringSetter(value: StringEnum) {}

      @byteString accessor byteString: ConstStringEnum;
      @byteString set byteStringSetter(value: ConstStringEnum) {}

      @usvString accessor usvString: `on${Capitalize<keyof typeof StringEnum>}`;
      @usvString set usvStringSetter(
        value: `on${Capitalize<keyof typeof StringEnum>}`,
      ) {}

      @object accessor object: { a: number; b: boolean };
      @object set objectSetter(value: { a: number; b: boolean }) {}

      @symbol accessor symbol:
        | typeof Symbol.iterator
        | typeof Symbol.asyncIterator;
      @symbol set symbolSetter(
        value: typeof Symbol.iterator | typeof Symbol.asyncIterator,
      ) {}

      @enumeration("up", "down", "left", "right") accessor enumeration:
        | "up"
        | "down"
        | "left"
        | "right";
      @enumeration(Object.values(StringEnum))
      set enumerationSetter(value: StringEnum) {}

      // note: non-null
      @legacyCallbackFunction accessor legacyCallbackFunction: (
        a: number,
      ) => boolean;

      @sequence(coerceToDOMString) accessor strings: StringEnum[];
      @sequence(coerceToDOMString) set stringsSetter(
        value: ConstStringEnum[],
      ) {}

      @record(coerceToDouble) accessor record: Record<string, ConstNumericEnum>;
      @record(coerceToByteString, coerceToObject) set recordSetter(
        value: Record<StringEnum, { a: number; b: boolean }>,
      ) {}

      @frozenArray(coerceToDouble) accessor numbers: readonly NumericEnum[];
      @frozenArray(coerceToDouble) set numbersSetter(
        value: readonly ConstNumericEnum[],
      ) {}

      // byte

      @byte accessor byte: NumericEnum;
      @byte set byteSetter(value: NumericEnum) {}

      @clampedByte accessor clampedByte: ConstNumericEnum;
      @clampedByte set clampedByteSetter(value: ConstNumericEnum) {}

      @enforcedByte accessor enforcedByte: 1 | 2 | 3;
      @enforcedByte set enforcedByteSetter(value: 1 | 2 | 3) {}

      // octet

      @octet accessor octet: ConstNumericEnum;
      @octet set octetSetter(value: ConstNumericEnum) {}

      @clampedOctet accessor clampedOctet: 1 | 2 | 3;
      @clampedOctet set clampedOctetSetter(value: 1 | 2 | 3) {}

      @enforcedOctet accessor enforcedOctet: NumericEnum;
      @enforcedOctet set enforcedOctetSetter(value: NumericEnum) {}

      // short

      @short accessor short: 1 | 2 | 3;
      @short set shortSetter(value: 1 | 2 | 3) {}

      @clampedShort accessor clampedShort: NumericEnum;
      @clampedShort set clampedShortSetter(value: NumericEnum) {}

      @enforcedShort accessor enforcedShort: ConstNumericEnum;
      @enforcedShort set enforcedShortSetter(value: ConstNumericEnum) {}

      // unsignedShort

      @unsignedShort accessor unsignedshort: NumericEnum;
      @unsignedShort set unsignedshortSetter(value: NumericEnum) {}

      @clampedUnsignedShort accessor clampedUnsignedShort: ConstNumericEnum;
      @clampedUnsignedShort set clampedUnsignedShortSetter(
        value: ConstNumericEnum,
      ) {}

      @enforcedUnsignedShort accessor enforcedUnsignedShort: 1 | 2 | 3;
      @enforcedUnsignedShort set enforcedUnsignedShortSetter(
        value: 1 | 2 | 3,
      ) {}

      // long

      @long accessor long: ConstNumericEnum;
      @long set longSetter(value: ConstNumericEnum) {}

      @clampedLong accessor clampedLong: 1 | 2 | 3;
      @clampedLong set clampedLongSetter(value: 1 | 2 | 3) {}

      @enforcedLong accessor enforcedLong: NumericEnum;
      @enforcedLong set enforcedLongSetter(value: NumericEnum) {}

      // unsignedLong

      @unsignedLong accessor unsignedlong: 1 | 2 | 3;
      @unsignedLong set unsignedlongSetter(value: 1 | 2 | 3) {}

      @clampedUnsignedLong accessor clampedUnsignedLong: NumericEnum;
      @clampedUnsignedLong set clampedUnsignedLongSetter(value: NumericEnum) {}

      @enforcedUnsignedLong accessor enforcedUnsignedLong: ConstNumericEnum;
      @enforcedUnsignedLong set enforcedUnsignedLongSetter(
        value: ConstNumericEnum,
      ) {}

      // longlong

      @longLong accessor longLong: NumericEnum;
      @longLong set longLongSetter(value: NumericEnum) {}

      @clampedLongLong accessor clampedLongLong: ConstNumericEnum;
      @clampedLongLong set clampedLongLongSetter(value: ConstNumericEnum) {}

      @enforcedLongLong accessor enforcedLongLong: 1 | 2 | 3;
      @enforcedLongLong set enforcedLongLongSetter(value: 1 | 2 | 3) {}

      // unsignedLongLong

      @unsignedLongLong accessor unsignedlonglong: ConstNumericEnum;
      @unsignedLongLong set unsignedlonglongSetter(value: ConstNumericEnum) {}

      @clampedUnsignedLongLong accessor clampedUnsignedLongLong: 1 | 2 | 3;
      @clampedUnsignedLongLong set clampedUnsignedLongLongSetter(
        value: 1 | 2 | 3,
      ) {}

      @enforcedUnsignedLongLong accessor enforcedUnsignedLongLong: NumericEnum;
      @enforcedUnsignedLongLong set enforcedUnsignedLongLongSetter(
        value: NumericEnum,
      ) {}

      // float

      @float accessor float: 1 | 2 | 3;
      @float set floatSetter(value: 1 | 2 | 3) {}

      @unrestrictedFloat accessor unrestrictedFloat: NumericEnum;
      @unrestrictedFloat set unrestrictedFloatSetter(value: NumericEnum) {}

      // double

      @double accessor double: ConstNumericEnum;
      @double set doubleSetter(value: ConstNumericEnum) {}

      @unrestrictedDouble accessor unrestrictedDouble: 1 | 2 | 3;
      @unrestrictedDouble set unrestrictedDoubleSetter(value: 1 | 2 | 3) {}
    },
  ).type.not.toRaiseError();
});

test("errors", () => {
  expect(
    class {
      @boolean accessor notBoolean: number;
    },
  ).type.toRaiseError(1240, 1270);

  expect(
    class {
      @interfaceType accessor element: Element;
    },
  ).type.toRaiseError(1240, 1270);

  expect(
    class {
      @interfaceType() accessor element: Element;
    },
  ).type.toRaiseError(2554);

  expect(
    class {
      @sequence(coerceToDOMString) accessor strings: number[];
    },
  ).type.toRaiseError(1240, 1270);

  expect(
    class {
      @sequence accessor strings: string[];
    },
  ).type.toRaiseError(1240, 1270);

  expect(
    class {
      @record(coerceToDouble, coerceToDOMString) accessor record: Record<
        string,
        number
      >;
    },
  ).type.toRaiseError(2345);

  expect(
    class {
      @record(coerceToDOMString) accessor record: Record<string, number>;
    },
  ).type.toRaiseError(1240, 1270);

  expect(
    class {
      @record accessor record: Record<string, string>;
    },
  ).type.toRaiseError(1240, 1270);

  expect(
    class {
      @frozenArray(coerceToDouble) accessor numbers: readonly string[];
    },
  ).type.toRaiseError(1240, 1270);

  expect(
    class {
      @frozenArray accessor numbers: readonly number[];
    },
  ).type.toRaiseError(1240, 1270);
});
