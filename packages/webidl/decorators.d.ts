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
export declare const any: TypeCoercionDecorator<any>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `boolean`
 *
 * @see {@link coerceToBoolean}
 */
export declare const boolean: TypeCoercionDecorator<boolean>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `byte`
 *
 * @see {@link coerceToByte}
 */
export declare const byte: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] byte`
 *
 * @see {@link coerceToClampedByte}
 */
export declare const clampedByte: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] byte`
 *
 * @see {@link coerceToEnforcedByte}
 */
export declare const enforcedByte: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `octet`
 *
 * @see {@link coerceToOctet}
 */
export declare const octet: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] octet`
 *
 * @see {@link coerceToClampedOctet}
 */
export declare const clampedOctet: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] octet`
 *
 * @see {@link coerceToEnforcedOctet}
 */
export declare const enforcedOctet: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `short`
 *
 * @see {@link coerceToShort}
 */
export declare const short: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] short`
 *
 * @see {@link coerceToClampedShort}
 */
export declare const clampedShort: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] short`
 *
 * @see {@link coerceToEnforcedShort}
 */
export declare const enforcedShort: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unsigned short`
 *
 * @see {@link coerceToUnsignedShort}
 */
export declare const unsignedShort: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] unsigned short`
 *
 * @see {@link coerceToClampedUnsignedShort}
 */
export declare const clampedUnsignedShort: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] unsigned short`
 *
 * @see {@link coerceToEnforcedUnsignedShort}
 */
export declare const enforcedUnsignedShort: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `long`
 *
 * @see {@link coerceToLong}
 */
export declare const long: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] Long`
 *
 * @see {@link coerceToClampedLong}
 */
export declare const clampedLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] Long`
 *
 * @see {@link coerceToEnforcedLong}
 */
export declare const enforcedLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unsigned long`
 *
 * @see {@link coerceToUnsignedLong}
 */
export declare const unsignedLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] unsigned long`
 *
 * @see {@link coerceToClampedUnsignedLong}
 */
export declare const clampedUnsignedLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] unsigned long`
 *
 * @see {@link coerceToEnforcedUnsignedLong}
 */
export declare const enforcedUnsignedLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `long long`
 *
 * @see {@link coerceToLongLong}
 */
export declare const longLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] long long`
 *
 * @see {@link coerceToClampedLongLong}
 */
export declare const clampedLongLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] long long`
 *
 * @see {@link coerceToEnforcedLongLong}
 */
export declare const enforcedLongLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unsigned long long`
 *
 * @see {@link coerceToUnsignedLongLong}
 */
export declare const unsignedLongLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[Clamp] unsigned long long`
 *
 * @see {@link coerceToClampedUnsignedLongLong}
 */
export declare const clampedUnsignedLongLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[EnforceRange] unsigned long long`
 *
 * @see {@link coerceToEnforcedUnsignedLongLong}
 */
export declare const enforcedUnsignedLongLong: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `float`
 *
 * @see {@link coerceToFloat}
 */
export declare const float: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unrestricted float`
 *
 * @see {@link coerceToUnrestrictedFloat}
 */
export declare const unrestrictedFloat: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `double`
 *
 * @see {@link coerceToDouble}
 */
export declare const double: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `unrestricted double`
 *
 * @see {@link coerceToUnrestrictedDouble}
 */
export declare const unrestrictedDouble: TypeCoercionDecorator<number>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `bigint`
 *
 * @see {@link coerceToBigInt}
 */
export declare const bigInt: TypeCoercionDecorator<bigint>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `DOMString`
 *
 * @see {@link coerceToDOMString}
 */
export declare const domString: TypeCoercionDecorator<string>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `ByteString`
 *
 * @see {@link coerceToByteString}
 */
export declare const byteString: TypeCoercionDecorator<string>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `USVString`
 *
 * @see {@link coerceToUSVString}
 */
export declare const usvString: TypeCoercionDecorator<string>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `object`
 *
 * @see {@link coerceToObject}
 */
export declare const object: TypeCoercionDecorator<object>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `symbol`
 *
 * @see {@link coerceToSymbol}
 */
export declare const symbol: TypeCoercionDecorator<symbol>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `Promise`
 *
 * @see {@link coerceToPromise}
 */
export declare const promise: TypeCoercionDecorator<Promise<unknown>>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `callback` function
 *
 * @see {@link coerceToCallbackFunction}
 */
export declare const callbackFunction: TypeCoercionDecorator<
  (...args: any[]) => any
>;
/**
 * Coerce a setter or an auto-accessor's setter value to IDL `[LegacyTreatNonObjectAsNull] callback` function
 *
 * @see {@link coerceToLegacyCallbackFunction}
 */
export declare const legacyCallbackFunction: TypeCoercionDecorator<
  ((...args: any[]) => any) | null
>;
