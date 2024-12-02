export interface TypeCoercionDecorator<BaseValue> {
  <This, Value extends BaseValue>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>,
  ): ClassAccessorDecoratorResult<This, Value>;

  <This, Value extends BaseValue>(
    target: (this: This, value: Value) => void,
    context: ClassSetterDecoratorContext<This, Value>,
  ): (this: This, value: Value) => void;
}

/**
 * Coerce a setter or an auto-accessor's setter value to IDL `any`
 *
 * @see {@link coerceToAny}
 */
export const any: TypeCoercionDecorator<any>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `boolean`
 *
 * @see {@link coerceToBoolean}
 */
export const boolean: TypeCoercionDecorator<boolean>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `byte`
 *
 * @see {@link coerceToByte}
 */
export const byte: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] byte`
 *
 * @see {@link coerceToClampedByte}
 */
export const clampedByte: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] byte`
 *
 * @see {@link coerceToEnforcedByte}
 */
export const enforcedByte: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `octet`
 *
 * @see {@link coerceToOctet}
 */
export const octet: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] octet`
 *
 * @see {@link coerceToClampedOctet}
 */
export const clampedOctet: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] octet`
 *
 * @see {@link coerceToEnforcedOctet}
 */
export const enforcedOctet: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `short`
 *
 * @see {@link coerceToShort}
 */
export const short: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] short`
 *
 * @see {@link coerceToClampedShort}
 */
export const clampedShort: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] short`
 *
 * @see {@link coerceToEnforcedShort}
 */
export const enforcedShort: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unsigned short`
 *
 * @see {@link coerceToUnsignedShort}
 */
export const unsignedShort: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] unsigned short`
 *
 * @see {@link coerceToClampedUnsignedShort}
 */
export const clampedUnsignedShort: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] unsigned short`
 *
 * @see {@link coerceToEnforcedUnsignedShort}
 */
export const enforcedUnsignedShort: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `long`
 *
 * @see {@link coerceToLong}
 */
export const long: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] Long`
 *
 * @see {@link coerceToClampedLong}
 */
export const clampedLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] Long`
 *
 * @see {@link coerceToEnforcedLong}
 */
export const enforcedLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unsigned long`
 *
 * @see {@link coerceToUnsignedLong}
 */
export const unsignedLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] unsigned long`
 *
 * @see {@link coerceToClampedUnsignedLong}
 */
export const clampedUnsignedLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] unsigned long`
 *
 * @see {@link coerceToEnforcedUnsignedLong}
 */
export const enforcedUnsignedLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `long long`
 *
 * @see {@link coerceToLongLong}
 */
export const longLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] long long`
 *
 * @see {@link coerceToClampedLongLong}
 */
export const clampedLongLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] long long`
 *
 * @see {@link coerceToEnforcedLongLong}
 */
export const enforcedLongLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unsigned long long`
 *
 * @see {@link coerceToUnsignedLongLong}
 */
export const unsignedLongLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] unsigned long long`
 *
 * @see {@link coerceToClampedUnsignedLongLong}
 */
export const clampedUnsignedLongLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] unsigned long long`
 *
 * @see {@link coerceToEnforcedUnsignedLongLong}
 */
export const enforcedUnsignedLongLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `float`
 *
 * @see {@link coerceToFloat}
 */
export const float: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unrestricted float`
 *
 * @see {@link coerceToUnrestrictedFloat}
 */
export const unrestrictedFloat: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `double`
 *
 * @see {@link coerceToDouble}
 */
export const double: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unrestricted double`
 *
 * @see {@link coerceToUnrestrictedDouble}
 */
export const unrestrictedDouble: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `bigint`
 *
 * @see {@link coerceToBigInt}
 */
export const bigInt: TypeCoercionDecorator<bigint>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `DOMString`
 *
 * @see {@link coerceToDOMString}
 */
export const domString: TypeCoercionDecorator<string>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `ByteString`
 *
 * @see {@link coerceToByteString}
 */
export const byteString: TypeCoercionDecorator<string>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `USVString`
 *
 * @see {@link coerceToUSVString}
 */
export const usvString: TypeCoercionDecorator<string>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `object`
 *
 * @see {@link coerceToObject}
 */
export const object: TypeCoercionDecorator<object>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `symbol`
 *
 * @see {@link coerceToSymbol}
 */
export const symbol: TypeCoercionDecorator<symbol>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `Promise`
 *
 * @see {@link coerceToPromise}
 */
export const promise: TypeCoercionDecorator<Promise<unknown>>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `callback` function
 *
 * @see {@link coerceToCallbackFunction}
 */
export const callbackFunction: TypeCoercionDecorator<(...args: any[]) => any>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[LegacyTreatNonObjectAsNull] callback` function
 *
 * @see {@link coerceToLegacyCallbackFunction}
 */
export const legacyCallbackFunction: TypeCoercionDecorator<
  ((...args: any[]) => any) | null
>;
