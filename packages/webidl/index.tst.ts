import { expect } from "tstyche";
import {
  coerceToAny,
  coerceToBigInt,
  coerceToBoolean,
  coerceToByte,
  coerceToByteString,
  coerceToCallbackFunction,
  coerceToClampedByte,
  coerceToDOMString,
  coerceToDouble,
  coerceToEnforcedByte,
  coerceToLegacyCallbackFunction,
  coerceToLong,
  coerceToObject,
  coerceToPromise,
  coerceToSymbol,
  coerceToUndefined,
  coerceToUnrestrictedDouble,
  coerceToUnsignedLong,
  coerceToUSVString,
} from "@platformer/webidl";

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

expect(function common(
  bool: boolean,
  long: number,
  unsignedLong: number,
  double: number,
  unrestrictedDouble: number,
  domString: string,
  usvString: string,
  callback: (...args: any[]) => any,
  legacyCallback: ((...args: any[]) => any) | null,
) {
  bool = coerceToBoolean(bool);
  long = coerceToLong(long);
  unsignedLong = coerceToUnsignedLong(unsignedLong);
  double = coerceToDouble(double);
  unrestrictedDouble = coerceToUnrestrictedDouble(unrestrictedDouble);
  domString = coerceToDOMString(domString);
  usvString = coerceToUSVString(usvString);
  callback = coerceToCallbackFunction(callback);
  legacyCallback = coerceToLegacyCallbackFunction(legacyCallback);
}).type.not.toRaiseError();

expect(function uncommonNonNumber(
  any: any,
  undef: undefined,
  bigInt: bigint,
  object: object,
  symbol: symbol,
) {
  any = coerceToAny(any);
  undef = coerceToUndefined(undef);
  bigInt = coerceToBigInt(bigInt);
  object = coerceToObject(object);
  symbol = coerceToSymbol(symbol);
}).type.not.toRaiseError();

expect(function uncommonNumbers(
  byte: number,
  clampedByte: number,
  enforcedByte: number,
) {
  byte = coerceToByte(byte);
  clampedByte = coerceToClampedByte(clampedByte);
  enforcedByte = coerceToEnforcedByte(enforcedByte);
}).type.not.toRaiseError();

expect(function numberSubtypes(
  union: 1 | 2 | 3,
  numericEnum: NumericEnum,
  constEnum: ConstNumericEnum,
) {
  union = coerceToDouble(union);
  numericEnum = coerceToDouble(numericEnum);
  constEnum = coerceToDouble(constEnum);
}).type.not.toRaiseError();

expect(function stringSubtypes(
  unionDomString: "one" | "two" | "three",
  unionUsvString: "one" | "two" | "three",
  unionByteString: "one" | "two" | "three",
  enumDomString: StringEnum,
  enumUsvString: StringEnum,
  enumByteString: StringEnum,
  constEnumDomString: ConstStringEnum,
  constEnumUsvString: ConstStringEnum,
  constEnumByteString: ConstStringEnum,
  templateDomString: `on${Capitalize<typeof enumDomString>}`,
  templateUsvString: `on${Capitalize<typeof enumUsvString>}`,
  templateByteString: `on${Capitalize<typeof enumByteString>}`,
) {
  unionDomString = coerceToDOMString(unionDomString);
  unionUsvString = coerceToUSVString(unionUsvString);
  unionByteString = coerceToByteString(unionByteString);
  enumDomString = coerceToDOMString(enumDomString);
  enumUsvString = coerceToUSVString(enumUsvString);
  enumByteString = coerceToByteString(enumByteString);
  constEnumDomString = coerceToDOMString(constEnumDomString);
  constEnumUsvString = coerceToUSVString(constEnumUsvString);
  constEnumByteString = coerceToByteString(constEnumByteString);
  templateDomString = coerceToDOMString(templateDomString);
  templateUsvString = coerceToUSVString(templateUsvString);
  templateByteString = coerceToByteString(templateByteString);
}).type.not.toRaiseError();

expect(function objectSubtypes(
  func: (a: number, b: boolean) => string,
  obj: { a: number; b: boolean; c: string },
) {
  func = coerceToObject(func);
  obj = coerceToObject(obj);
}).type.not.toRaiseError();

expect(function functionSubtypes(
  simple: (a: number, b: boolean) => string,
  overloads: {
    (a: number): void;
    (b: boolean): string;
    (a: number, b: boolean): string;
  },
  generic: <A, B>(this: A, arg: B) => B | null,
  nullableSimple: typeof simple | null,
  nullableOverloads: typeof overloads | null,
  nullableGeneric: typeof generic | null,
) {
  simple = coerceToCallbackFunction(simple);
  overloads = coerceToCallbackFunction(overloads);
  generic = coerceToCallbackFunction(generic);
  nullableSimple = coerceToCallbackFunction(nullableSimple);
  nullableOverloads = coerceToCallbackFunction(nullableOverloads);
  nullableGeneric = coerceToCallbackFunction(nullableGeneric);
});

expect(function typedPromises(
  number: Promise<number>,
  string: Promise<string>,
  union: boolean | Promise<boolean>,
) {
  number = coerceToPromise(number);
  string = coerceToPromise(string);
  union = coerceToPromise(union);
  // 'union' is inferred as a Promise<boolean>
  expect(union).type.toBe<Promise<boolean>>();
}).type.not.toRaiseError();

expect(function symbolSubtypes(
  union: typeof Symbol.toPrimitive | typeof Symbol.toStringTag,
) {
  union = coerceToSymbol(union);
}).type.not.toRaiseError();
