# @platformer/webidl

This package implements the [WebIDL type coercion rules](https://webidl.spec.whatwg.org/#js-type-mapping), with exceptions for some edge cases to keep the library lightweight.

## Deviations from WebIDL

- integer types that are clamped to their value range use `Math.round()` rules for rounding rather than rounding to the closest even number for halfway values (such that 0.5 rounds to 1 rather than 0 for instance).

## TODO

Currently, only scalar values (boolean, integer and floating-point numbers, bigint, strings, and symbol) as well as `object` and `Promise` are implemented;
no arrays (sequences, etc.), callbacks, interfaces, records, enumerations, unions, or buffer sources (typed arrays and array views).

## API

This package exports functions whose name starts with `coerceTo`, that take a value as their single argument, and return that value coerced to the according IDL type.
IDL integer types come with variants prefixed with `Clamped` and `Enforced` corresponding to the `[Clamp]` and `[EnforceRange]` extended attributes respectively.

```js
const coerced = coerceToLong("-12.3"); // ← -12 as a JavaScript number
```
