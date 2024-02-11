import {
  parseDouble,
  parseInteger,
  parseNonNegativeInteger,
} from "@platformer/microsyntaxes";

/**
 * Implement the [rules for parsing integers](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#rules-for-parsing-integers)
 * and part of the getter [steps for reflecting integer properties](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-long)
 *
 * @param {string} value the attribute value (non null)
 * @param {boolean} nonNegative whether the attribute is limited to only non-negative numbers
 * @param {number} defaultValue the default value
 * @returns {number} 'value' parsed as an integer and normalized, or the default value
 */
export function stringToInteger(value, nonNegative, defaultValue) {
  const result = nonNegative
    ? parseNonNegativeInteger(value)
    : parseInteger(value);
  if (
    result != null &&
    (nonNegative ? 0 : -0x80000000) <= result &&
    result <= 0x7fffffff
  ) {
    return result;
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
  const result = parseDouble(value);
  if (result == null || (onlyPositive && result <= 0)) {
    return defaultValue;
  }
  return result;
}
