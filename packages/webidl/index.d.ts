/**
 * Implements coercion to IDL `any`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-any | The WebIDL specification}
 */
export declare function coerceToAny(value: any): any;
/**
 * Implements coercion to IDL `undefined`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-undefined | The WebIDL specification}
 */
export declare function coerceToUndefined(value: any): undefined;
/**
 * Implements coercion to IDL `boolean`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-boolean | The WebIDL specification}
 */
export declare function coerceToBoolean(value: any): boolean;
/**
 * Implements coercion to IDL `byte`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-byte | The WebIDL specification}
 */
export declare function coerceToByte<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `[Clamp] byte`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-byte | The WebIDL specification}
 */
export declare function coerceToClampedByte<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `[EnforceRange] byte`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-byte | The WebIDL specification}
 */
export declare function coerceToEnforcedByte<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `octet`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-octet | The WebIDL specification}
 */
export declare function coerceToOctet<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `[Clamp] octet`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-octet | The WebIDL specification}
 */
export declare function coerceToClampedOctet<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `[EnforceRange] octet`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-octet | The WebIDL specification}
 */
export declare function coerceToEnforcedOctet<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `short`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-short | The WebIDL specification}
 */
export declare function coerceToShort<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `[Clamp] short`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-short | The WebIDL specification}
 */
export declare function coerceToClampedShort<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `[EnforceRange] short`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-short | The WebIDL specification}
 */
export declare function coerceToEnforcedShort<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `unsigned short`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-short | The WebIDL specification}
 */
export declare function coerceToUnsignedShort<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `[Clamp] unsigned short`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-short | The WebIDL specification}
 */
export declare function coerceToClampedUnsignedShort<R extends number>(
  value: any,
): R;
/**
 * Implements coercion to IDL `[EnforceRange] unsigned short`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-short | The WebIDL specification}
 */
export declare function coerceToEnforcedUnsignedShort<R extends number>(
  value: any,
): R;
/**
 * Implements coercion to IDL `long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-long | The WebIDL specification}
 */
export declare function coerceToLong<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `[Clamp] long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-long | The WebIDL specification}
 */
export declare function coerceToClampedLong<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `[EnforceRange] long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-long | The WebIDL specification}
 */
export declare function coerceToEnforcedLong<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `unsignedLong`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-long | The WebIDL specification}
 */
export declare function coerceToUnsignedLong<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `[Clamp] unsigned long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-long | The WebIDL specification}
 */
export declare function coerceToClampedUnsignedLong<R extends number>(
  value: any,
): R;
/**
 * Implements coercion to IDL `[enforceRange] unsigned long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-long | The WebIDL specification}
 */
export declare function coerceToEnforcedUnsignedLong<R extends number>(
  value: any,
): R;
/**
 * Implements coercion to IDL `long long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-long-long | The WebIDL specification}
 */
export declare function coerceToLongLong<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `[Clamp] long long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-long-long | The WebIDL specification}
 */
export declare function coerceToClampedLongLong<R extends number>(
  value: any,
): R;
/**
 * Implements coercion to IDL `[EnforceRange] long long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-long-long | The WebIDL specification}
 */
export declare function coerceToEnforcedLongLong<R extends number>(
  value: any,
): R;
/**
 * Implements coercion to IDL `unsigned long long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-long-long | The WebIDL specification}
 */
export declare function coerceToUnsignedLongLong<R extends number>(
  value: any,
): R;
/**
 * Implements coercion to IDL `[Clamp] unsigned long long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-long-long | The WebIDL specification}
 */
export declare function coerceToClampedUnsignedLongLong<R extends number>(
  value: any,
): R;
/**
 * Implements coercion to IDL `[EnforceRange] unsigned long long`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unsigned-long-long | The WebIDL specification}
 */
export declare function coerceToEnforcedUnsignedLongLong<R extends number>(
  value: any,
): R;
/**
 * Implements coercion to IDL `float`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-float | The WebIDL specification}
 */
export declare function coerceToFloat<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `unrestricted float`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unrestricted-float | The WebIDL specification}
 */
export declare function coerceToUnrestrictedFloat<R extends number>(
  value: any,
): R;
/**
 * Implements coercion to IDL `double`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-double | The WebIDL specification}
 */
export declare function coerceToDouble<R extends number>(value: any): R;
/**
 * Implements coercion to IDL `unrestricted double`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-unrestricted-double | The WebIDL specification}
 */
export declare function coerceToUnrestrictedDouble<R extends number>(
  value: any,
): R;
/**
 * Implements coercion to IDL `bigint`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-bigint | The WebIDL specification}
 */
export declare function coerceToBigInt<R extends bigint>(value: any): R;
/**
 * Implement coercion to an IDL numeric type or `bigint`
 *
 * @see {@link https://webidl.spec.whatwg.org/#es-to-bigint-or-numeric | The WebIDL specification}
 */
export declare function coerceToBigIntOrNumericType<
  N extends number,
  R extends bigint | N,
>(coerceToNumericType: ((value: any) => N) | undefined, value: any): R;
/**
 * Implements coercion to IDL `DOMString`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-DOMString | The WebIDL specification}
 */
export declare function coerceToDOMString<R extends string>(value: any): R;
/**
 * Implements coercion to IDL `ByteString`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-ByteString | The WebIDL specification}
 */
export declare function coerceToByteString<R extends string>(value: any): R;
/**
 * Implements coercion to IDL `USVString`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-USVString | The WebIDL specification}
 */
export declare function coerceToUSVString<R extends string>(value: any): R;
/**
 * Implements coercion to IDL `object`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-object | The WebIDL specification}
 */
export declare function coerceToObject<R extends object>(value: any): R;
/**
 * Implements coercion to IDL `symbol`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-symbol | The WebIDL specification}
 */
export declare function coerceToSymbol<R extends symbol>(value: any): R;
/**
 * Implements coercion to IDL interface type
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-interface | The WebIDL specification}
 */
export declare function coerceToInterface<R extends object>(
  iface: { new (): R; prototype: R },
  value: any,
): R;
/**
 * Implements coercion to IDL enumeration type
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-enumeration | The WebIDL specification}
 */
export declare function coerceToEnumeration<E extends string>(
  allowedValues: E[],
  value: any,
): E;
/**
 * Implements coercion to IDL `callback` function
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-callback-function | The WebIDL specification}
 */
export declare function coerceToCallbackFunction<
  R extends (...args: any[]) => any,
>(value: any): R;
/**
 * Implements coercion to IDL `[LegacyTreatNonObjectAsNull] callback` function
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-callback-function | The WebIDL specification}
 */
export declare function coerceToLegacyCallbackFunction<
  R extends (...args: any[]) => any,
>(value: any): R | null;
/**
 * Implements coercion to IDL `sequence<T>`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-sequence | The WebIDL specification}
 */
export declare function coerceToSequence<R = any>(
  coerceValue: ((value: any) => R) | undefined,
  value: any,
): R[];
/**
 * Implements coercion to IDL `record<K, V>`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-record | The WebIDL specification}
 */
export declare function coerceToRecord<K extends string = string, V = any>(
  coerceKey: ((key: any) => K) | undefined,
  coerceValue: ((value: any) => V) | undefined,
  value: any,
): Record<K, V>;
/**
 * Implements coercion to IDL `Promise`.
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-promise | The WebIDL specification}
 */
export declare function coerceToPromise<R = any>(
  coerceValue: ((value: any) => Awaited<R>) | undefined,
  value: any,
): Promise<Awaited<R>>;
/**
 * Implement coercion to IDL `FrozenArray<T>`
 *
 * @see {@link https://webidl.spec.whatwg.org/#js-frozen-array | The WebIDL specification}
 */
export declare function coerceToFrozenArray<R = any>(
  coerceValue: ((value: any) => R) | undefined,
  value: any,
): readonly R[];

/**
 * Implement coercion of an optional argument's value.
 *
 * @see {@link https://webidl.spec.whatwg.org/#ref-for-dfn-optionality-value%E2%91%A3 | The WebIDL specification}
 */
export declare function coerceOptional<R>(
  coerceValue: (value: any) => R,
  value: any,
): R | undefined;
export declare function coerceOptional<R>(
  coerceValue: (value: any) => R,
  defaultValue: R | undefined,
  value: any,
): R | undefined;

/**
 * Implement coercion of a variadic argument's value.
 *
 * @see {@link https://webidl.spec.whatwg.org/#ref-for-dfn-convert-ecmascript-to-idl-value%E2%91%A6%E2%91%A0 | The WebIDL specification}
 */
export declare function coerceVariadic<R = any>(
  coerceValue: ((value: any) => R) | undefined,
  value: any[],
): R[];

/**
 * Implement the "_P_ is an array index" algorithm.
 *
 * @returns `false` if the algorithm returns false, the _index_ when it's specified to return true
 * @see {@link https://webidl.spec.whatwg.org/#is-an-array-index | The WebIDL specification}
 */
export declare function isArrayIndex(property: any): number | false;

// Callback interface types, dictionary types, unions, buffer sources
