/**
 * Implements coercion to IDL `any`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-any | The WebIDL specification}
 */
export function coerceToAny(value: any): any;
/**
 * Implements coercion to IDL `undefined`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-undefined | The WebIDL specification}
 */
export function coerceToUndefined(value: any): undefined;
/**
 * Implements coercion to IDL `boolean`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-boolean | The WebIDL specification}
 */
export function coerceToBoolean(value: any): boolean;
/**
 * Implements coercion to IDL `byte`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-byte | The WebIDL specification}
 */
export function coerceToByte(value: any): number;
/**
 * Implements coercion to IDL `[Clamp] byte`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-byte | The WebIDL specification}
 */
export function coerceToClampedByte(value: any): number;
/**
 * Implements coercion to IDL `[EnforceRange] byte`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-byte | The WebIDL specification}
 */
export function coerceToEnforcedByte(value: any): number;
/**
 * Implements coercion to IDL `octet`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-octet | The WebIDL specification}
 */
export function coerceToOctet(value: any): number;
/**
 * Implements coercion to IDL `[Clamp] octet`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-octet | The WebIDL specification}
 */
export function coerceToClampedOctet(value: any): number;
/**
 * Implements coercion to IDL `[EnforceRange] octet`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-octet | The WebIDL specification}
 */
export function coerceToEnforcedOctet(value: any): number;
/**
 * Implements coercion to IDL `short`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-short | The WebIDL specification}
 */
export function coerceToShort(value: any): number;
/**
 * Implements coercion to IDL `[Clamp] short`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-short | The WebIDL specification}
 */
export function coerceToClampedShort(value: any): number;
/**
 * Implements coercion to IDL `[EnforceRange] short`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-short | The WebIDL specification}
 */
export function coerceToEnforcedShort(value: any): number;
/**
 * Implements coercion to IDL `unsigned short`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-short | The WebIDL specification}
 */
export function coerceToUnsignedShort(value: any): number;
/**
 * Implements coercion to IDL `[Clamp] unsigned short`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-short | The WebIDL specification}
 */
export function coerceToClampedUnsignedShort(value: any): number;
/**
 * Implements coercion to IDL `[EnforceRange] unsigned short`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-short | The WebIDL specification}
 */
export function coerceToEnforcedUnsignedShort(value: any): number;
/**
 * Implements coercion to IDL `long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-long | The WebIDL specification}
 */
export function coerceToLong(value: any): number;
/**
 * Implements coercion to IDL `[Clamp] long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-long | The WebIDL specification}
 */
export function coerceToClampedLong(value: any): number;
/**
 * Implements coercion to IDL `[EnforceRange] long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-long | The WebIDL specification}
 */
export function coerceToEnforcedLong(value: any): number;
/**
 * Implements coercion to IDL `unsignedLong`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-long | The WebIDL specification}
 */
export function coerceToUnsignedLong(value: any): number;
/**
 * Implements coercion to IDL `[Clamp] unsigned long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-long | The WebIDL specification}
 */
export function coerceToClampedUnsignedLong(value: any): number;
/**
 * Implements coercion to IDL `[enforceRange] unsigned long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-long | The WebIDL specification}
 */
export function coerceToEnforcedUnsignedLong(value: any): number;
/**
 * Implements coercion to IDL `long long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-long-long | The WebIDL specification}
 */
export function coerceToLongLong(value: any): number;
/**
 * Implements coercion to IDL `[Clamp] long long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-long-long | The WebIDL specification}
 */
export function coerceToClampedLongLong(value: any): number;
/**
 * Implements coercion to IDL `[EnforceRange] long long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-long-long | The WebIDL specification}
 */
export function coerceToEnforcedLongLong(value: any): number;
/**
 * Implements coercion to IDL `unsigned long long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-long-long | The WebIDL specification}
 */
export function coerceToUnsignedLongLong(value: any): number;
/**
 * Implements coercion to IDL `[Clamp] unsigned long long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-long-long | The WebIDL specification}
 */
export function coerceToClampedUnsignedLongLong(value: any): number;
/**
 * Implements coercion to IDL `[EnforceRange] unsigned long long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-long-long | The WebIDL specification}
 */
export function coerceToEnforcedUnsignedLongLong(value: any): number;
/**
 * Implements coercion to IDL `float`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-float | The WebIDL specification}
 */
export function coerceToFloat(value: any): number;
/**
 * Implements coercion to IDL `unrestricted float`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unrestricted-float | The WebIDL specification}
 */
export function coerceToUnrestrictedFloat(value: any): number;
/**
 * Implements coercion to IDL `double`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-double | The WebIDL specification}
 */
export function coerceToDouble(value: any): number;
/**
 * Implements coercion to IDL `unrestricted double`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unrestricted-double | The WebIDL specification}
 */
export function coerceToUnrestrictedDouble(value: any): number;
/**
 * Implements coercion to IDL `bigint`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-bigint | The WebIDL specification}
 */
export function coerceToBigInt(value: any): bigint;
/**
 * Implements coercion to IDL `DOMString`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-DOMString | The WebIDL specification}
 */
export function coerceToDOMString(value: any): string;
/**
 * Implements coercion to IDL `ByteString`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-ByteString | The WebIDL specification}
 */
export function coerceToByteString(value: any): string;
/**
 * Implements coercion to IDL `ByteString`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-ByteString | The WebIDL specification}
 */
export function coerceToUSVString(value: any): string;
/**
 * Implements coercion to IDL `object`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-object | The WebIDL specification}
 */
export function coerceToObject(value: any): object;
/**
 * Implements coercion to IDL `symbol`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-symbol | The WebIDL specification}
 */
export function coerceToSymbol(value: any): symbol;
/**
 * Implements coercion to IDL `Promise`.
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-promise | The WebIDL specification}
 */
export function coerceToPromise(value: any): Promise<unknown>;

// Interface types, callback interface types, dictionary types, enumeration types, callback function types, sequences, records, unions, frozen array

// buffer sources
