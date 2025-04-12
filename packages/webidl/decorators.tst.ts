import { expect, test } from "tstyche";
import {
  coerceToBoolean,
  coerceToByteString,
  coerceToDOMString,
  coerceToDouble,
  coerceToObject,
} from "@webfeet/webidl";
import {
  any,
  bigInt,
  bigIntOrNumericType,
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
} from "@webfeet/webidl/decorators.js";

class AllDecorators {
  @(expect(any).type.toBeApplicable)
  accessor any: any;
  @(expect(any).type.toBeApplicable)
  set anySetter(value: any) {}

  @(expect(boolean).type.toBeApplicable)
  accessor boolean!: boolean;
  @(expect(boolean).type.toBeApplicable)
  set booleanSetter(value: boolean) {}

  @(expect(bigInt).type.toBeApplicable)
  accessor bigInt!: bigint;
  @(expect(bigInt).type.toBeApplicable)
  set bigIntSetter(value: bigint) {}

  @(expect(bigIntOrNumericType()).type.toBeApplicable)
  accessor bigIntOrDouble!: bigint | number;
  @(expect(bigIntOrNumericType()).type.toBeApplicable)
  set bigIntOrDoubleSetter(value: bigint | number) {}

  @(expect(domString).type.toBeApplicable)
  accessor domString!: string;
  @(expect(domString).type.toBeApplicable)
  set domStringSetter(value: string) {}

  @(expect(byteString).type.toBeApplicable)
  accessor byteString!: string;
  @(expect(byteString).type.toBeApplicable)
  set byteStringSetter(value: string) {}

  @(expect(usvString).type.toBeApplicable)
  accessor usvString!: string;
  @(expect(usvString).type.toBeApplicable)
  set usvStringSetter(value: string) {}

  @(expect(object).type.toBeApplicable)
  accessor object!: object;
  @(expect(object).type.toBeApplicable)
  set objectSetter(value: object) {}

  @(expect(symbol).type.toBeApplicable)
  accessor symbol!: symbol;
  @(expect(symbol).type.toBeApplicable)
  set symbolSetter(value: symbol) {}

  @(expect(interfaceType(HTMLElement)).type.toBeApplicable)
  accessor element!: HTMLElement;
  @(expect(interfaceType(HTMLElement)).type.toBeApplicable)
  set elementSetter(value: HTMLElement) {}

  @enumeration<string>(["up", "down", "left", "right"])
  accessor enumeration!: string;
  @enumeration<string>("up", "down", "left", "right")
  set enumerationSetter(value: string) {}

  @(expect(promise()).type.toBeApplicable)
  accessor promise!: Promise<boolean>;
  @(expect(promise(coerceToBoolean)).type.toBeApplicable)
  set promiseSetter(value: Promise<boolean>) {}

  @(expect(callbackFunction).type.toBeApplicable)
  accessor callbackFunction!: (a: number, b: string) => boolean;
  @(expect(callbackFunction).type.toBeApplicable)
  set callbackFunctionSetter(value: (a: number, b: string) => boolean) {}

  @(expect(legacyCallbackFunction).type.toBeApplicable)
  accessor legacyCallbackFunction!: ((a: number, b: string) => boolean) | null;
  @(expect(legacyCallbackFunction).type.toBeApplicable)
  set legacyCallbackFunctionSetter(
    value: ((a: number, b: string) => boolean) | null,
  ) {}

  @(expect(sequence(coerceToDOMString)).type.toBeApplicable)
  accessor strings!: string[];
  @(expect(sequence(coerceToDOMString)).type.toBeApplicable)
  set stringsSetter(value: string[]) {}
  @(expect(sequence()).type.toBeApplicable)
  accessor anys!: any[];

  @(expect(record(coerceToDouble)).type.toBeApplicable)
  accessor record!: Record<string, number>;
  @(expect(record(coerceToByteString, coerceToBoolean)).type.toBeApplicable)
  set recordSetter(value: Record<string, boolean>) {}
  @(expect(record()).type.toBeApplicable)
  accessor record2!: Record<string, boolean>;

  @(expect(frozenArray(coerceToDouble)).type.toBeApplicable)
  accessor numbers!: readonly number[];
  @(expect(frozenArray(coerceToDouble)).type.toBeApplicable)
  set numbersSetter(value: readonly number[]) {}
  @(expect(frozenArray()).type.toBeApplicable)
  accessor frozenAnys!: readonly any[];

  // byte

  @(expect(byte).type.toBeApplicable)
  accessor byte!: number;
  @(expect(byte).type.toBeApplicable)
  set byteSetter(value: number) {}

  @(expect(clampedByte).type.toBeApplicable)
  accessor clampedByte!: number;
  @(expect(clampedByte).type.toBeApplicable)
  set clampedByteSetter(value: number) {}

  @(expect(enforcedByte).type.toBeApplicable)
  accessor enforcedByte!: number;
  @(expect(enforcedByte).type.toBeApplicable)
  set enforcedByteSetter(value: number) {}

  // octet

  @(expect(octet).type.toBeApplicable)
  accessor octet!: number;
  @(expect(octet).type.toBeApplicable)
  set octetSetter(value: number) {}

  @(expect(clampedOctet).type.toBeApplicable)
  accessor clampedOctet!: number;
  @(expect(clampedOctet).type.toBeApplicable)
  set clampedOctetSetter(value: number) {}

  @(expect(enforcedOctet).type.toBeApplicable)
  accessor enforcedOctet!: number;
  @(expect(enforcedOctet).type.toBeApplicable)
  set enforcedOctetSetter(value: number) {}

  // short

  @(expect(short).type.toBeApplicable)
  accessor short!: number;
  @(expect(short).type.toBeApplicable)
  set shortSetter(value: number) {}

  @(expect(clampedShort).type.toBeApplicable)
  accessor clampedShort!: number;
  @(expect(clampedShort).type.toBeApplicable)
  set clampedShortSetter(value: number) {}

  @(expect(enforcedShort).type.toBeApplicable)
  accessor enforcedShort!: number;
  @(expect(enforcedShort).type.toBeApplicable)
  set enforcedShortSetter(value: number) {}

  // unsignedShort

  @(expect(unsignedShort).type.toBeApplicable)
  accessor unsignedshort!: number;
  @(expect(unsignedShort).type.toBeApplicable)
  set unsignedshortSetter(value: number) {}

  @(expect(clampedUnsignedShort).type.toBeApplicable)
  accessor clampedUnsignedShort!: number;
  @(expect(clampedUnsignedShort).type.toBeApplicable)
  set clampedUnsignedShortSetter(value: number) {}

  @(expect(enforcedUnsignedShort).type.toBeApplicable)
  accessor enforcedUnsignedShort!: number;
  @(expect(enforcedUnsignedShort).type.toBeApplicable)
  set enforcedUnsignedShortSetter(value: number) {}

  // long

  @(expect(long).type.toBeApplicable)
  accessor long!: number;
  @(expect(long).type.toBeApplicable)
  set longSetter(value: number) {}

  @(expect(clampedLong).type.toBeApplicable)
  accessor clampedLong!: number;
  @(expect(clampedLong).type.toBeApplicable)
  set clampedLongSetter(value: number) {}

  @(expect(enforcedLong).type.toBeApplicable)
  accessor enforcedLong!: number;
  @(expect(enforcedLong).type.toBeApplicable)
  set enforcedLongSetter(value: number) {}

  // unsignedLong

  @(expect(unsignedLong).type.toBeApplicable)
  accessor unsignedlong!: number;
  @(expect(unsignedLong).type.toBeApplicable)
  set unsignedlongSetter(value: number) {}

  @(expect(clampedUnsignedLong).type.toBeApplicable)
  accessor clampedUnsignedLong!: number;
  @(expect(clampedUnsignedLong).type.toBeApplicable)
  set clampedUnsignedLongSetter(value: number) {}

  @(expect(enforcedUnsignedLong).type.toBeApplicable)
  accessor enforcedUnsignedLong!: number;
  @(expect(enforcedUnsignedLong).type.toBeApplicable)
  set enforcedUnsignedLongSetter(value: number) {}

  // longlong

  @(expect(longLong).type.toBeApplicable)
  accessor longLong!: number;
  @(expect(longLong).type.toBeApplicable)
  set longLongSetter(value: number) {}

  @(expect(clampedLongLong).type.toBeApplicable)
  accessor clampedLongLong!: number;
  @(expect(clampedLongLong).type.toBeApplicable)
  set clampedLongLongSetter(value: number) {}

  @(expect(enforcedLongLong).type.toBeApplicable)
  accessor enforcedLongLong!: number;
  @(expect(enforcedLongLong).type.toBeApplicable)
  set enforcedLongLongSetter(value: number) {}

  // unsignedLongLong

  @(expect(unsignedLongLong).type.toBeApplicable)
  accessor unsignedlonglong!: number;
  @(expect(unsignedLongLong).type.toBeApplicable)
  set unsignedlonglongSetter(value: number) {}

  @(expect(clampedUnsignedLongLong).type.toBeApplicable)
  accessor clampedUnsignedLongLong!: number;
  @(expect(clampedUnsignedLongLong).type.toBeApplicable)
  set clampedUnsignedLongLongSetter(value: number) {}

  @(expect(enforcedUnsignedLongLong).type.toBeApplicable)
  accessor enforcedUnsignedLongLong!: number;
  @(expect(enforcedUnsignedLongLong).type.toBeApplicable)
  set enforcedUnsignedLongLongSetter(value: number) {}

  // float

  @(expect(float).type.toBeApplicable)
  accessor float!: number;
  @(expect(float).type.toBeApplicable)
  set floatSetter(value: number) {}

  @(expect(unrestrictedFloat).type.toBeApplicable)
  accessor unrestrictedFloat!: number;
  @(expect(unrestrictedFloat).type.toBeApplicable)
  set unrestrictedFloatSetter(value: number) {}

  // double

  @(expect(double).type.toBeApplicable)
  accessor double!: number;
  @(expect(double).type.toBeApplicable)
  set doubleSetter(value: number) {}

  @(expect(unrestrictedDouble).type.toBeApplicable)
  accessor unrestrictedDouble!: number;
  @(expect(unrestrictedDouble).type.toBeApplicable)
  set unrestrictedDoubleSetter(value: number) {}
}

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

  class AllDecoratorsWithSubtypes {
    @(expect(bigInt).type.toBeApplicable)
    accessor bigInt!: 1n | 42n;
    @(expect(bigInt).type.toBeApplicable)
    set bigIntSetter(value: 1n | 42n) {}

    @(expect(bigIntOrNumericType()).type.toBeApplicable)
    accessor bigIntOrDouble!: 1n | 42;
    @(expect(bigIntOrNumericType()).type.toBeApplicable)
    set bigIntOrDoubleSetter(value: 1n | 42) {}

    @(expect(domString).type.toBeApplicable)
    accessor domString!: StringEnum;
    @(expect(domString).type.toBeApplicable)
    set domStringSetter(value: StringEnum) {}

    @(expect(byteString).type.toBeApplicable)
    accessor byteString!: ConstStringEnum;
    @(expect(byteString).type.toBeApplicable)
    set byteStringSetter(value: ConstStringEnum) {}

    @usvString
    accessor usvString!: `on${Capitalize<keyof typeof StringEnum>}`;
    @(expect(usvString).type.toBeApplicable)
    set usvStringSetter(value: `on${Capitalize<keyof typeof StringEnum>}`) {}

    @(expect(object).type.toBeApplicable)
    accessor object!: { a: number; b: boolean };
    @(expect(object).type.toBeApplicable)
    set objectSetter(value: { a: number; b: boolean }) {}

    @(expect(symbol).type.toBeApplicable)
    accessor symbol!: typeof Symbol.iterator | typeof Symbol.asyncIterator;
    @(expect(symbol).type.toBeApplicable)
    set symbolSetter(
      value: typeof Symbol.iterator | typeof Symbol.asyncIterator,
    ) {}

    @(expect(enumeration("up", "down", "left", "right")).type.toBeApplicable)
    accessor enumeration!: "up" | "down" | "left" | "right";
    @(expect(enumeration(Object.values(StringEnum))).type.toBeApplicable)
    set enumerationSetter(value: StringEnum) {}

    // note: non-null
    @(expect(legacyCallbackFunction).type.toBeApplicable)
    accessor legacyCallbackFunction!: (a: number) => boolean;

    @(expect(sequence(coerceToDOMString)).type.toBeApplicable)
    accessor strings!: StringEnum[];
    @(expect(sequence(coerceToDOMString)).type.toBeApplicable)
    set stringsSetter(value: ConstStringEnum[]) {}

    @(expect(record(coerceToDouble)).type.toBeApplicable)
    accessor record!: Record<string, ConstNumericEnum>;
    @(expect(record(coerceToByteString, coerceToObject)).type.toBeApplicable)
    set recordSetter(value: Record<StringEnum, { a: number; b: boolean }>) {}

    @(expect(promise(coerceToDOMString)).type.toBeApplicable)
    accessor promise!: Promise<StringEnum>;
    @(expect(promise(coerceToDOMString)).type.toBeApplicable)
    set promiseSetter(value: Promise<ConstStringEnum>) {}

    @(expect(frozenArray(coerceToDouble)).type.toBeApplicable)
    accessor numbers!: readonly NumericEnum[];
    @(expect(frozenArray(coerceToDouble)).type.toBeApplicable)
    set numbersSetter(value: readonly ConstNumericEnum[]) {}

    // byte

    @(expect(byte).type.toBeApplicable)
    accessor byte!: NumericEnum;
    @(expect(byte).type.toBeApplicable)
    set byteSetter(value: NumericEnum) {}

    @(expect(clampedByte).type.toBeApplicable)
    accessor clampedByte!: ConstNumericEnum;
    @(expect(clampedByte).type.toBeApplicable)
    set clampedByteSetter(value: ConstNumericEnum) {}

    @(expect(enforcedByte).type.toBeApplicable)
    accessor enforcedByte!: 1 | 2 | 3;
    @(expect(enforcedByte).type.toBeApplicable)
    set enforcedByteSetter(value: 1 | 2 | 3) {}

    // octet

    @(expect(octet).type.toBeApplicable)
    accessor octet!: ConstNumericEnum;
    @(expect(octet).type.toBeApplicable)
    set octetSetter(value: ConstNumericEnum) {}

    @(expect(clampedOctet).type.toBeApplicable)
    accessor clampedOctet!: 1 | 2 | 3;
    @(expect(clampedOctet).type.toBeApplicable)
    set clampedOctetSetter(value: 1 | 2 | 3) {}

    @(expect(enforcedOctet).type.toBeApplicable)
    accessor enforcedOctet!: NumericEnum;
    @(expect(enforcedOctet).type.toBeApplicable)
    set enforcedOctetSetter(value: NumericEnum) {}

    // short

    @(expect(short).type.toBeApplicable)
    accessor short!: 1 | 2 | 3;
    @(expect(short).type.toBeApplicable)
    set shortSetter(value: 1 | 2 | 3) {}

    @(expect(clampedShort).type.toBeApplicable)
    accessor clampedShort!: NumericEnum;
    @(expect(clampedShort).type.toBeApplicable)
    set clampedShortSetter(value: NumericEnum) {}

    @(expect(enforcedShort).type.toBeApplicable)
    accessor enforcedShort!: ConstNumericEnum;
    @(expect(enforcedShort).type.toBeApplicable)
    set enforcedShortSetter(value: ConstNumericEnum) {}

    // unsignedShort

    @(expect(unsignedShort).type.toBeApplicable)
    accessor unsignedshort!: NumericEnum;
    @(expect(unsignedShort).type.toBeApplicable)
    set unsignedshortSetter(value: NumericEnum) {}

    @(expect(clampedUnsignedShort).type.toBeApplicable)
    accessor clampedUnsignedShort!: ConstNumericEnum;
    @(expect(clampedUnsignedShort).type.toBeApplicable)
    set clampedUnsignedShortSetter(value: ConstNumericEnum) {}

    @(expect(enforcedUnsignedShort).type.toBeApplicable)
    accessor enforcedUnsignedShort!: 1 | 2 | 3;
    @(expect(enforcedUnsignedShort).type.toBeApplicable)
    set enforcedUnsignedShortSetter(value: 1 | 2 | 3) {}

    // long

    @(expect(long).type.toBeApplicable)
    accessor long!: ConstNumericEnum;
    @(expect(long).type.toBeApplicable)
    set longSetter(value: ConstNumericEnum) {}

    @(expect(clampedLong).type.toBeApplicable)
    accessor clampedLong!: 1 | 2 | 3;
    @(expect(clampedLong).type.toBeApplicable)
    set clampedLongSetter(value: 1 | 2 | 3) {}

    @(expect(enforcedLong).type.toBeApplicable)
    accessor enforcedLong!: NumericEnum;
    @(expect(enforcedLong).type.toBeApplicable)
    set enforcedLongSetter(value: NumericEnum) {}

    // unsignedLong

    @(expect(unsignedLong).type.toBeApplicable)
    accessor unsignedlong!: 1 | 2 | 3;
    @(expect(unsignedLong).type.toBeApplicable)
    set unsignedlongSetter(value: 1 | 2 | 3) {}

    @(expect(clampedUnsignedLong).type.toBeApplicable)
    accessor clampedUnsignedLong!: NumericEnum;
    @(expect(clampedUnsignedLong).type.toBeApplicable)
    set clampedUnsignedLongSetter(value: NumericEnum) {}

    @(expect(enforcedUnsignedLong).type.toBeApplicable)
    accessor enforcedUnsignedLong!: ConstNumericEnum;
    @(expect(enforcedUnsignedLong).type.toBeApplicable)
    set enforcedUnsignedLongSetter(value: ConstNumericEnum) {}

    // longlong

    @(expect(longLong).type.toBeApplicable)
    accessor longLong!: NumericEnum;
    @(expect(longLong).type.toBeApplicable)
    set longLongSetter(value: NumericEnum) {}

    @(expect(clampedLongLong).type.toBeApplicable)
    accessor clampedLongLong!: ConstNumericEnum;
    @(expect(clampedLongLong).type.toBeApplicable)
    set clampedLongLongSetter(value: ConstNumericEnum) {}

    @(expect(enforcedLongLong).type.toBeApplicable)
    accessor enforcedLongLong!: 1 | 2 | 3;
    @(expect(enforcedLongLong).type.toBeApplicable)
    set enforcedLongLongSetter(value: 1 | 2 | 3) {}

    // unsignedLongLong

    @(expect(unsignedLongLong).type.toBeApplicable)
    accessor unsignedlonglong!: ConstNumericEnum;
    @(expect(unsignedLongLong).type.toBeApplicable)
    set unsignedlonglongSetter(value: ConstNumericEnum) {}

    @(expect(clampedUnsignedLongLong).type.toBeApplicable)
    accessor clampedUnsignedLongLong!: 1 | 2 | 3;
    @(expect(clampedUnsignedLongLong).type.toBeApplicable)
    set clampedUnsignedLongLongSetter(value: 1 | 2 | 3) {}

    @(expect(enforcedUnsignedLongLong).type.toBeApplicable)
    accessor enforcedUnsignedLongLong!: NumericEnum;
    @(expect(enforcedUnsignedLongLong).type.toBeApplicable)
    set enforcedUnsignedLongLongSetter(value: NumericEnum) {}

    // float

    @(expect(float).type.toBeApplicable)
    accessor float!: 1 | 2 | 3;
    @(expect(float).type.toBeApplicable)
    set floatSetter(value: 1 | 2 | 3) {}

    @(expect(unrestrictedFloat).type.toBeApplicable)
    accessor unrestrictedFloat!: NumericEnum;
    @(expect(unrestrictedFloat).type.toBeApplicable)
    set unrestrictedFloatSetter(value: NumericEnum) {}

    // double

    @(expect(double).type.toBeApplicable)
    accessor double!: ConstNumericEnum;
    @(expect(double).type.toBeApplicable)
    set doubleSetter(value: ConstNumericEnum) {}

    @(expect(unrestrictedDouble).type.toBeApplicable)
    accessor unrestrictedDouble!: 1 | 2 | 3;
    @(expect(unrestrictedDouble).type.toBeApplicable)
    set unrestrictedDoubleSetter(value: 1 | 2 | 3) {}
  }
});

test("wrong type", () => {
  class WrongType {
    @(expect(boolean).type.not.toBeApplicable)
    accessor notBoolean!: number;

    @(expect(bigIntOrNumericType()).type.not.toBeApplicable)
    accessor notNumeric!: string;

    @(expect(sequence(coerceToDOMString)).type.not.toBeApplicable)
    accessor strings!: number[];

    @(expect(record(coerceToDOMString)).type.not.toBeApplicable)
    accessor record!: Record<string, number>;

    @(expect(promise(coerceToDouble)).type.not.toBeApplicable)
    accessor string!: Promise<string>;

    @(expect(frozenArray(coerceToDouble)).type.not.toBeApplicable)
    accessor numbers!: readonly string[];
  }

  expect(bigIntOrNumericType).type.not.toBeCallableWith(coerceToDOMString);
  expect(record).type.not.toBeCallableWith(coerceToDouble, coerceToDOMString);
});
test("missing options", () => {
  class MissingOptions {
    @(expect(bigIntOrNumericType).type.not.toBeApplicable)
    accessor bigIntOrNumericType!: bigint | number;

    @(expect(interfaceType).type.not.toBeApplicable)
    accessor element!: Element;

    @(expect(sequence).type.not.toBeApplicable)
    accessor strings!: string[];

    @(expect(record).type.not.toBeApplicable)
    accessor record!: Record<string, string>;

    @(expect(promise).type.not.toBeApplicable)
    accessor number!: Promise<number>;

    @(expect(frozenArray).type.not.toBeApplicable)
    accessor numbers!: readonly number[];
  }

  expect(interfaceType).type.not.toBeCallableWith();
});
