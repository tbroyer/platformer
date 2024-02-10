import webidl from "./webidl-conversions.js";

/**
 * Coerce value to WebIDL DOMString.
 *
 * @param {any} value
 * @returns {string}
 */
export function coerceToDOMString(value) {
  return webidl["DOMString"](value);
}

/**
 * Coerce value to WebIDL USVString.
 *
 * @param {any} value
 * @returns {string}
 */
export function coerceToUSVString(value) {
  return webidl["USVString"](value);
}

/**
 * Coerce value to WebIDL boolean.
 *
 * @param {any} value
 * @returns {string}
 */
export function coerceToBoolean(value) {
  return webidl["boolean"](value);
}

/**
 * Coerce value to WebIDL long.
 *
 * @param {any} value
 * @returns {number}
 */
export function coerceToLong(value) {
  return webidl["long"](value);
}

/**
 * Coerce value to WebIDL unsigned long.
 *
 * @param {any} value
 * @returns {number}
 */
export function coerceToUnsignedLong(value) {
  return webidl["unsigned long"](value);
}

/**
 * Coerce value to WebIDL double.
 *
 * @param {any} value
 * @returns {number}
 */
export function coerceToDouble(value) {
  return webidl["double"](value);
}

/**
 * Implement the [rules for parsing integers](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#rules-for-parsing-integers)
 * and part of the getter [steps for reflecting integer properties](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-long)
 *
 * @param {string} value the attribute value (non null)
 * @param {boolean} nonNegative whether the attribute is limited to only non-negative numbers
 * @param {number} defaultValue the default value
 * @returns {number} 'value' parsed as an integer and normalized, or the default value
 */
// Copied from Gecko's reflectInt
export function stringToInteger(value, nonNegative, defaultValue) {
  // Parse: Ignore leading whitespace, find [+/-][numbers]
  var result = /^[ \t\n\f\r]*([+-]?[0-9]+)/.exec(value);
  if (result) {
    var resultInt = parseInt(result[1], 10);
    if (
      (nonNegative ? 0 : -0x80000000) <= resultInt &&
      resultInt <= 0x7fffffff
    ) {
      // If the value is within allowed value range for signed/unsigned
      // integer, return it -- but add 0 to it to convert a possible -0 into
      // +0, the only zero present in the signed integer range.
      return resultInt + 0;
    }
  }
  return defaultValue;
}

/**
 * Implement the [rules for parsing floating-point numbers](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#rules-for-parsing-floating-point-number-values)
 * and part of the getter [steps for reflecting double properties](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-double)
 *
 * @param {string} value the attribute value (non null)
 * @param {boolean} onlyPositive whether the attribute is limited to only positive numbers
 * @param {number} defaultValue the default value
 * @returns {number} 'vaue' parsed as a floating-point number and normalized, or the default value
 */
export function stringToDouble(value, onlyPositive, defaultValue) {
  let result = /^[ \t\n\f\r]*([0-9.eE+-]+)/.exec(value);
  if (result) {
    let resultFloat = parseFloat(result[1]);
    if (!Number.isNaN(resultFloat) && (!onlyPositive || resultFloat > 0)) {
      return resultFloat;
    }
  }
  return defaultValue;
}

/**
 * Implement the [ASCII lowercase](https://infra.spec.whatwg.org/#ascii-lowercase) transformation
 * to help implement [ASCII case-insensitive match](https://infra.spec.whatwg.org/#ascii-case-insensitive).
 *
 * @param {string} value
 * @returns {string}
 */
export function toASCIILowerCase(value) {
  return value.replace(/[A-Z]/g, (u) => u.toLowerCase());
}
