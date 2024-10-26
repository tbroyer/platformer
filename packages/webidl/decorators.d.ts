interface ClassAccessorOrSetterDecorator<Value> {
  <This>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>,
  ): ClassAccessorDecoratorResult<This, Value>;

  <This>(
    target: (this: This, value: Value) => void,
    context: ClassSetterDecoratorContext<This, Value>,
  ): (this: This, value: Value) => void;
}

/**
 * Coerce a setter or an auto-accessor's setter value to IDL `any`
 *
 * @see {@link coerceToAny}
 */
export const any: ClassAccessorOrSetterDecorator<any>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `boolean`
 *
 * @see {@link coerceToBoolean}
 */
export const boolean: ClassAccessorOrSetterDecorator<boolean>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `byte`
 *
 * @see {@link coerceToByte}
 */
export const byte: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] byte`
 *
 * @see {@link coerceToClampedByte}
 */
export const clampedByte: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] byte`
 *
 * @see {@link coerceToEnforcedByte}
 */
export const enforcedByte: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `octet`
 *
 * @see {@link coerceToOctet}
 */
export const octet: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] octet`
 *
 * @see {@link coerceToClampedOctet}
 */
export const clampedOctet: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] octet`
 *
 * @see {@link coerceToEnforcedOctet}
 */
export const enforcedOctet: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `short`
 *
 * @see {@link coerceToShort}
 */
export const short: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] short`
 *
 * @see {@link coerceToClampedShort}
 */
export const clampedShort: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] short`
 *
 * @see {@link coerceToEnforcedShort}
 */
export const enforcedShort: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unsigned short`
 *
 * @see {@link coerceToUnsignedShort}
 */
export const unsignedShort: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] unsigned short`
 *
 * @see {@link coerceToClampedUnsignedShort}
 */
export const clampedUnsignedShort: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] unsigned short`
 *
 * @see {@link coerceToEnforcedUnsignedShort}
 */
export const enforcedUnsignedShort: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `long`
 *
 * @see {@link coerceToLong}
 */
export const long: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] Long`
 *
 * @see {@link coerceToClampedLong}
 */
export const clampedLong: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] Long`
 *
 * @see {@link coerceToEnforcedLong}
 */
export const enforcedLong: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unsigned long`
 *
 * @see {@link coerceToUnsignedLong}
 */
export const unsignedLong: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] unsigned long`
 *
 * @see {@link coerceToClampedUnsignedLong}
 */
export const clampedUnsignedLong: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] unsigned long`
 *
 * @see {@link coerceToEnforcedUnsignedLong}
 */
export const enforcedUnsignedLong: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `long long`
 *
 * @see {@link coerceToLongLong}
 */
export const longLong: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] long long`
 *
 * @see {@link coerceToClampedLongLong}
 */
export const clampedLongLong: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] long long`
 *
 * @see {@link coerceToEnforcedLongLong}
 */
export const enforcedLongLong: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unsigned long long`
 *
 * @see {@link coerceToUnsignedLongLong}
 */
export const unsignedLongLong: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] unsigned long long`
 *
 * @see {@link coerceToClampedUnsignedLongLong}
 */
export const clampedUnsignedLongLong: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] unsigned long long`
 *
 * @see {@link coerceToEnforcedUnsignedLongLong}
 */
export const enforcedUnsignedLongLong: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `float`
 *
 * @see {@link coerceToFloat}
 */
export const float: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unrestricted float`
 *
 * @see {@link coerceToUnrestrictedFloat}
 */
export const unrestrictedFloat: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `double`
 *
 * @see {@link coerceToDouble}
 */
export const double: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unrestricted double`
 *
 * @see {@link coerceToUnrestrictedDouble}
 */
export const unrestrictedDouble: ClassAccessorOrSetterDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `bigint`
 *
 * @see {@link coerceToBigInt}
 */
export const bigInt: ClassAccessorOrSetterDecorator<bigint>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `DOMString`
 *
 * @see {@link coerceToDOMString}
 */
export const domString: ClassAccessorOrSetterDecorator<string>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `ByteString`
 *
 * @see {@link coerceToByteString}
 */
export const byteString: ClassAccessorOrSetterDecorator<string>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `USVString`
 *
 * @see {@link coerceToUSVString}
 */
export const usvString: ClassAccessorOrSetterDecorator<string>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `object`
 *
 * @see {@link coerceToObject}
 */
export const object: ClassAccessorOrSetterDecorator<object>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `symbol`
 *
 * @see {@link coerceToSymbol}
 */
export const symbol: ClassAccessorOrSetterDecorator<symbol>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `Promise`
 *
 * @see {@link coerceToPromise}
 */
export const promise: ClassAccessorOrSetterDecorator<Promise<unknown>>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `callback` function
 *
 * @see {@link coerceToCallbackFunction}
 */
export type callbackFunction<F extends (...args: any[]) => any> =
  ClassAccessorOrSetterDecorator<F>;
export const callbackFunction: callbackFunction<(...args: any[]) => any>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[LegacyTreatNonObjectAsNull] callback` function
 *
 * @see {@link coerceToLegacyCallbackFunction}
 */
export type legacyCallbackFunction<F extends (...args: any[]) => any | null> =
  ClassAccessorOrSetterDecorator<F>;
