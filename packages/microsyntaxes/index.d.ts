// TODO: use NoInfer when available (https://devblogs.microsoft.com/typescript/announcing-typescript-5-4-beta/#the-noinfer-utility-type)
export interface EnumeratedAttributeOptions<
  Keywords extends string,
  Aliases extends string,
> {
  /** The list of canonical keywords (to be returned by the property getter). */
  keywords: Keywords[];
  /** Non-canonical keywords that can be used as aliases, mapping to the equivalent canonical keyword. */
  aliases?: Record<Exclude<Aliases, Keywords>, Keywords>;
  /** The _missing value default_ for the enumerated attribute, that will be returned when the attribute is missing. */
  missing?: Keywords;
  /** The _invalid value default_ for the enumerated attribute, that will be returned when an invalid value is provided. */
  invalid?: Keywords;
}

/**
 * Implement the rules for determining the state of an [enumerated attribute](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#enumerated-attribute)
 *
 * @see {@link enumerated}
 *
 * @param value - the attribute value
 * @returns the canonical keyword corresponding to the determined state, or `null` for no state
 */
export interface ParseEnum<Keywords extends string> {
  /**
   * Implement the rules for determining the state of an [enumerated attribute](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#enumerated-attribute)
   *
   * @see {@link enumerated}
   *
   * @param value - the attribute value
   * @returns the canonical keyword corresponding to the determined state, or `null` for no state
   */
  (value: string | null): Keywords | null;
}

/**
 * Implement the rules for determining the state of an [enumerated attribute](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#enumerated-attribute)
 *
 * Only states with corresponding keywords are supported, so the concepts of states and canonical keywords are merged.
 *
 * @template Keywords - the union of canonical keywords
 * @template Aliases - the union of keyword aliases (a.k.a. non-canonical keywords)
 * @param options - the options of the enumerated attribute, including keywords
 * @returns a function to determine the state of an enumerated attribute.
 */
export function enumerated<Keywords extends string, Aliases extends string>(
  options: EnumeratedAttributeOptions<Keywords, Aliases>,
): ParseEnum<Keywords>;

/**
 * Implement the [rules for parsing integers](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#rules-for-parsing-integers)
 *
 * @param value - the attribute value (non null)
 * @returns 'value' parsed as an integer and normalized, or `null` in case of error
 */
export function parseInteger(value: string): number | null;

/**
 * Implement the [rules for parsing non-negative integers](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#rules-for-parsing-non-negative-integers)
 *
 * @param value - the attribute value (non null)
 * @returns 'value' parsed as an integer and normalized, or `null` in case of error
 */
export function parseNonNegativeInteger(value: string): number | null;

/**
 * Implement the [rules for parsing floating-point number values](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#rules-for-parsing-floating-point-number-values)
 *
 * @param value - the attribute value (non null)
 * @returns 'value' parsed as an integer and normalized, or `null` in case of error
 */
export function parseDouble(value: string): number | null;
