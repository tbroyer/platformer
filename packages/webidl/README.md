# @webfeet/webidl

Add webfeet to your APIs to help make them [~~swim like a duck~~](https://en.wikipedia.org/wiki/Duck_test) behave like native.

> If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.

This package implements the [WebIDL type coercion rules](https://webidl.spec.whatwg.org/#js-type-mapping), with exceptions for some edge cases to keep the library lightweight.

## Deviations from WebIDL

- integer types that are clamped to their value range use `Math.round()` rules for rounding rather than rounding to the closest even number for halfway values (such that 0.5 rounds to 1 rather than 0 for instance).

## TODO

Currently, scalar values (boolean, integer and floating-point numbers, bigint, strings, and symbol) as well as `object`, callback functions, arrays (`sequence` and `FrozenArray`), interface types, enumeration types, records, and `Promise` are implemented;
This means that only unions and buffer sources (typed arrays and array views) are missing.

## API

This package exports functions whose name starts with `coerceTo`, that take a value as their single argument, and return that value coerced to the according IDL type.
IDL integer types come with variants prefixed with `Clamped` and `Enforced` corresponding to the `[Clamp]` and `[EnforceRange]` extended attributes respectively.
The callback function type has a `Legacy` variant corresponding to the `[LegacyTreatNonObjectAsNull]` extended attribute.

```js
const coerced = coerceToLong("-12.3"); // ← -12 as a JavaScript number
```

A few exported functions, for _complex_ types, take additional arguments. Those always come first, and the value to coerce as the last argument, to make it easier to [_curry_](https://en.wikipedia.org/wiki/Currying) them. Those functions are listed in a separate table below.

```js
const coerced = coerceToSequence(coerceToLong, ["-12.3"]);
```

The package also exports as `@webfeet/webidl/decorators.js` a set of [ECMAScript decorators](https://github.com/tc39/proposal-decorators) to coerce a setter's or auto-accessor property setter's value. The decorators follow the same naming rule as the coercion functions they wrap but without the `coerceTo` prefix.

```js
class Foo {
  @long accessor bar;

  #baz;
  get baz() {
    return this.#baz;
  }
  @long set baz(value) {
    // `value` has been coerced to a `long`
    this.#baz = value;
  }
}
```

The coercion functions that take additional arguments have corresponding decorator factories taking those same arguments and returning a decorator.

```js
class Foo {
  @sequence(coerceToLong) accessor bar;
}
```

| IDL Type                                                                                                           | Function                           | Decorator                  |
| :----------------------------------------------------------------------------------------------------------------- | :--------------------------------- | :------------------------- |
| [`any`](https://webidl.spec.whatwg.org/#idl-any)                                                                   | `coerceToAny`                      | `any`                      |
| [`undefined`](https://webidl.spec.whatwg.org/#idl-undefined)                                                       | `coerceToUndefined`                | `undefined`                |
| [`boolean`](https://webidl.spec.whatwg.org/#idl-boolean)                                                           | `coerceToBoolean`                  | `boolean`                  |
| [`byte`]                                                                                                           | `coerceToByte`                     | `byte`                     |
| [`[Clamp]`][Clamp] [`byte`]                                                                                        | `coerceToClampedByte`              | `clampedByte`              |
| [`[EnforceRange]`][EnforceRange] [`byte`]                                                                          | `coerceToEnforcedByte`             | `enforcedByte`             |
| [`octet`]                                                                                                          | `coerceToOctet`                    | `octet`                    |
| [`[Clamp]`][Clamp] [`octet`]                                                                                       | `coerceToClampedOctet`             | `clampedOctet`             |
| [`[EnforceRange]`][EnforceRange] [`octet`]                                                                         | `coerceToEnforcedOctet`            | `enforcedOctet`            |
| [`short`]                                                                                                          | `coerceToShort`                    | `short`                    |
| [`[Clamp]`][Clamp] [`short`]                                                                                       | `coerceToClampedShort`             | `clampedShort`             |
| [`[EnforceRange]`][EnforceRange] [`short`]                                                                         | `coerceToEnforcedShort`            | `enforcedShort`            |
| [`unsigned short`]                                                                                                 | `coerceToUnsignedShort`            | `unsignedShort`            |
| [`[Clamp]`][Clamp] [`unsigned short`]                                                                              | `coerceToClampedUnsignedShort`     | `clampedUnsignedShort`     |
| [`[EnforceRange]`][EnforceRange] [`unsigned short`]                                                                | `coerceToEnforcedUnsignedShort`    | `enforcedUnsignedShort`    |
| [`long`]                                                                                                           | `coerceToLong`                     | `long`                     |
| [`[Clamp]`][Clamp] [`long`]                                                                                        | `coerceToClampedLong`              | `clampedLong`              |
| [`[EnforceRange]`][EnforceRange] [`long`]                                                                          | `coerceToEnforcedLong`             | `enforcedLong`             |
| [`unsigned long`]                                                                                                  | `coerceToUnsignedLong`             | `unsignedLong`             |
| [`[Clamp]`][Clamp] [`unsigned long`]                                                                               | `coerceToClampedUnsignedLong`      | `clampedUnsignedLong`      |
| [`[EnforceRange]`][EnforceRange] [`unsigned long`]                                                                 | `coerceToEnforcedUnsignedLong`     | `enforcedUnsignedLong`     |
| [`long long`]                                                                                                      | `coerceToLongLong`                 | `longLong`                 |
| [`[Clamp]`][Clamp] [`long long`]                                                                                   | `coerceToClampedLongLong`          | `clampedLongLong`          |
| [`[EnforceRange]`][EnforceRange] [`long long`]                                                                     | `coerceToEnforcedLongLong`         | `enforcedLongLong`         |
| [`unsigned long long`]                                                                                             | `coerceToUnsignedLongLong`         | `unsignedLonglong`         |
| [`[Clamp]`][Clamp] [`unsigned long long`]                                                                          | `coerceToClampedUnsignedLongLong`  | `clampedUnsignedLongLong`  |
| [`[EnforceRange]`][EnforceRange] [`unsigned long long`]                                                            | `coerceToEnforcedUnsignedLongLong` | `enforcedUnsignedLongLong` |
| [`float`](https://webidl.spec.whatwg.org/#idl-float)                                                               | `coerceToFloat`                    | `float`                    |
| [`unrestricted float`](https://webidl.spec.whatwg.org/#idl-unrestricted-float)                                     | `coerceToUnrestrictedFloat`        | `unrestrictedFloat`        |
| [`double`](https://webidl.spec.whatwg.org/#idl-double)                                                             | `coerceToDouble`                   | `double`                   |
| [`unrestricted double`](https://webidl.spec.whatwg.org/#idl-unrestricted-double)                                   | `coerceToUnrestrictedDouble`       | `unrestrictedDouble`       |
| [`bigint`](https://webidl.spec.whatwg.org/#idl-bigint)                                                             | `coerceToBigInt`                   | `bigInt`                   |
| [`DOMString`](https://webidl.spec.whatwg.org/#idl-DOMString)                                                       | `coerceToDOMString`                | `domString`                |
| [`ByteString`](https://webidl.spec.whatwg.org/#idl-ByteString)                                                     | `coerceToByteString`               | `byteString`               |
| [`USVString`](https://webidl.spec.whatwg.org/#idl-USVString)                                                       | `coerceToUSVString`                | `usvString`                |
| [`object`](https://webidl.spec.whatwg.org/#idl-object)                                                             | `coerceToObject`                   | `object`                   |
| [`symbol`](https://webidl.spec.whatwg.org/#idl-symbol)                                                             | `coerceToSymbol`                   | `symbol`                   |
| [`callback` function]                                                                                              | `coerceToCallbackFunction`         | `callbackFunction`         |
| [`[LegacyTreatNonObjectAsNull]`](https://webidl.spec.whatwg.org/#LegacyTreatNonObjectAsNull) [`callback` function] | `coerceToLegacyCallbackFunction`   | `legacyCallbackFunction`   |

[Clamp]: https://webidl.spec.whatwg.org/#Clamp
[EnforceRange]: https://webidl.spec.whatwg.org/#EnforceRange
[`byte`]: https://webidl.spec.whatwg.org/#idl-byte
[`octet`]: https://webidl.spec.whatwg.org/#idl-octet
[`short`]: https://webidl.spec.whatwg.org/#idl-short
[`unsigned short`]: https://webidl.spec.whatwg.org/#idl-unsigned-short
[`long`]: https://webidl.spec.whatwg.org/#idl-long
[`unsigned long`]: https://webidl.spec.whatwg.org/#idl-unsigned-long
[`long long`]: https://webidl.spec.whatwg.org/#idl-long-long
[`unsigned long long`]: https://webidl.spec.whatwg.org/#idl-unsigned-long-long
[`callback` function]: https://webidl.spec.whatwg.org/#idl-callback-function

| IDL Type                                                                     | Function                      | Decorator             | Additional arguments                                                                                                                                                    |
| :--------------------------------------------------------------------------- | :---------------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [numeric type](https://webidl.spec.whatwg.org/#dfn-numeric-type) or `bigint` | `coerceToBigIntOrNumericType` | `bigIntOrNumericType` | Another coercion function to be applied to a numeric value, defaults to `coerceToUnrestrictedDouble`                                                                    |
| [interface type](https://webidl.spec.whatwg.org/#idl-interface)              | `coerceToInterface`           | `interfaceType`       | An interface type, such as `HTMLElement`                                                                                                                                |
| [enumeration type](https://webidl.spec.whatwg.org/#idl-enumeration)          | `coerceToEnumeration`         | `enumeration`         | An array (or rest arguments for the decorator) of allowed string values                                                                                                 |
| [`sequence<T>`](https://webidl.spec.whatwg.org/#idl-sequence)                | `coerceToSequence`            | `sequence`            | Another coercion function to be applied to each sequence member, defaults to `coerceToAny`                                                                              |
| [`record<K,V>`](https://webidl.spec.whatwg.org/#idl-record)                  | `coerceToRecord`              | `record`              | Two coercion functions to be applied to each record key and value respectively, where the key has to be a string type, default to `coerceToDOMString` and `coerceToAny` |
| [`Promise<T>`](https://webidl.spec.whatwg.org/#idl-promise)                  | `coerceToPromise`             | `promise`             | Another coercion function to be applied to the resolved value                                                                                                           |
| [`FrozenArray<T>`](https://webidl.spec.whatwg.org/#idl-frozen-array)         | `coerceToFrozenArray`         | `frozenArray`         | Another coercion function to be applied to each sequence member, defaults to `coerceToAny`                                                                              |
