# @platformer/microsyntaxes

Implements the [HTML common microsyntaxes](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html).

## TODO

Currently, only enumerated attributes and numbers are implemented,
no dates and times, colors, space- or comma-separated tokens, or references.

## API

All parsing functions take a single string or null argument, and return that value parsed according to the specific rules.

### enumerated(options)(value) <a name="enumerated"></a>

This function is a factory returning a parser function implementing the rules for determining the state of an [enumerated attribute](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#enumerated-attribute).

The factory functions takes an object as argument with options as properties:

- `keywords`: mandatory; the list of _canonical_ keywords (those values that will be returned by the parser function)
- `aliases`: optional; an object associating aliases to their canonical keyword equivalent
- `missing`: optional; the _missing value default_ (must be a canonical keyword), returned when the parser function is called with `null`
- `invalid`: optional; the _invalid value default_ (must be a canonical keyword), returned when the parser function is called with an unknown value

The parser function (returned by the factory function) takes a single string or null argument and returns one of the canonical keywords (or null if `missing` or `invalid` are null).

For example, [the `shape` attribute](https://html.spec.whatwg.org/multipage/image-maps.html#the-area-element:enumerated-attribute) of `<area>` elements could be implemented as:

```js
const parseShape = enumerated({
  keywords: ["circle", "default", "poly", "rect"],
  aliases: {
    circ: "circle",
    polygon: "poly",
    rectangle: "rect",
  },
  missing: "rect",
  invalid: "rect",
});
parseShape(null); // → "rect"
parseShape("circle"); // → "circ"
```

### parseInteger(value) <a name="integer"></a>

This function implements the [rules for parsing integers](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#rules-for-parsing-integers).
It takes a single string or null argument and returns a number value, or null if the argument cannot be parsed.

### parseNonNegativeInteger(value) <a name="non-negative-integer"></a>

This function implements the [rules for parsing non-negative integers](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#rules-for-parsing-non-negative-integers).
It takes a single string or null argument and returns a number value, or null if the argument cannot be parsed.

### parseDouble(value) <a name="double"></a>

This function implements the [rules for parsing floating-point number values](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#rules-for-parsing-floating-point-number-values).
It takes a single string or null argument and returns a number value, or null if the argument cannot be parsed.
