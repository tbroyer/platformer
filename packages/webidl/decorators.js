import {
  coerceToAny,
  coerceToBigInt,
  coerceToBoolean,
  coerceToByte,
  coerceToByteString,
  coerceToClampedByte,
  coerceToClampedLong,
  coerceToClampedLongLong,
  coerceToClampedOctet,
  coerceToClampedShort,
  coerceToClampedUnsignedLong,
  coerceToClampedUnsignedLongLong,
  coerceToClampedUnsignedShort,
  coerceToDOMString,
  coerceToDouble,
  coerceToEnforcedByte,
  coerceToEnforcedLong,
  coerceToEnforcedLongLong,
  coerceToEnforcedOctet,
  coerceToEnforcedShort,
  coerceToEnforcedUnsignedLong,
  coerceToEnforcedUnsignedLongLong,
  coerceToEnforcedUnsignedShort,
  coerceToFloat,
  coerceToLong,
  coerceToLongLong,
  coerceToObject,
  coerceToOctet,
  coerceToPromise,
  coerceToShort,
  coerceToSymbol,
  coerceToUSVString,
  coerceToUnrestrictedDouble,
  coerceToUnrestrictedFloat,
  coerceToUnsignedLong,
  coerceToUnsignedLongLong,
  coerceToUnsignedShort,
  coerceToCallbackFunction,
  coerceToLegacyCallbackFunction,
} from "./index.js";

/**
 * @template T
 * @param {(value: any) => T} coerceValue
 * @returns {import("./decorators.js").ClassAccessorOrSetterDecorator<T>}
 */
function coerceDecorator(coerceValue) {
  return function (target, context) {
    switch (context.kind) {
      case "accessor": {
        const { set } = target;
        return {
          set(value) {
            set.call(this, coerceValue(value));
          },
        };
      }
      case "setter":
        return function (value) {
          target.call(this, coerceValue(value));
        };
      default:
        throw new Error(`Unsupported decorator location: ${context.kind}`);
    }
  };
}

export const any = coerceDecorator(coerceToAny);
export const bigInt = coerceDecorator(coerceToBigInt);
export const boolean = coerceDecorator(coerceToBoolean);
export const byte = coerceDecorator(coerceToByte);
export const byteString = coerceDecorator(coerceToByteString);
export const clampedByte = coerceDecorator(coerceToClampedByte);
export const clampedLong = coerceDecorator(coerceToClampedLong);
export const clampedLongLong = coerceDecorator(coerceToClampedLongLong);
export const clampedOctet = coerceDecorator(coerceToClampedOctet);
export const clampedShort = coerceDecorator(coerceToClampedShort);
export const clampedUnsignedLong = coerceDecorator(coerceToClampedUnsignedLong);
export const clampedUnsignedLongLong = coerceDecorator(
  coerceToClampedUnsignedLongLong,
);
export const clampedUnsignedShort = coerceDecorator(
  coerceToClampedUnsignedShort,
);
export const domString = coerceDecorator(coerceToDOMString);
export const double = coerceDecorator(coerceToDouble);
export const enforcedByte = coerceDecorator(coerceToEnforcedByte);
export const enforcedLong = coerceDecorator(coerceToEnforcedLong);
export const enforcedLongLong = coerceDecorator(coerceToEnforcedLongLong);
export const enforcedOctet = coerceDecorator(coerceToEnforcedOctet);
export const enforcedShort = coerceDecorator(coerceToEnforcedShort);
export const enforcedUnsignedLong = coerceDecorator(
  coerceToEnforcedUnsignedLong,
);
export const enforcedUnsignedLongLong = coerceDecorator(
  coerceToEnforcedUnsignedLongLong,
);
export const enforcedUnsignedShort = coerceDecorator(
  coerceToEnforcedUnsignedShort,
);
export const float = coerceDecorator(coerceToFloat);
export const long = coerceDecorator(coerceToLong);
export const longLong = coerceDecorator(coerceToLongLong);
export const object = coerceDecorator(coerceToObject);
export const octet = coerceDecorator(coerceToOctet);
export const promise = coerceDecorator(coerceToPromise);
export const short = coerceDecorator(coerceToShort);
export const symbol = coerceDecorator(coerceToSymbol);
export const usvString = coerceDecorator(coerceToUSVString);
export const unrestrictedDouble = coerceDecorator(coerceToUnrestrictedDouble);
export const unrestrictedFloat = coerceDecorator(coerceToUnrestrictedFloat);
export const unsignedLong = coerceDecorator(coerceToUnsignedLong);
export const unsignedLongLong = coerceDecorator(coerceToUnsignedLongLong);
export const unsignedShort = coerceDecorator(coerceToUnsignedShort);
export const callbackFunction = coerceDecorator(coerceToCallbackFunction);
export const legacyCallbackFunction = coerceDecorator(
  coerceToLegacyCallbackFunction,
);
