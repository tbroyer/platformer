import type { EnumeratedAttributeOptions } from "@webfeet/microsyntaxes";

export type { EnumeratedAttributeOptions };

/**
 * Implements the steps for [reflecting content attributes in IDL attributes](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes)
 * from the HTML specification.
 */
export interface Reflector<T> {
  readonly defaultValue: T;
  /**
   * Convert from the attribute value to the IDL value.
   *
   * This implements the _getter_ steps from the algorithm, except that the value has already been read from attribute.
   *
   * This can be called when the attribute value changes rather than when the property is read,
   * and the returned value can be cached.
   *
   * @param value - The attribute value, or `null` if the attribute is absent.
   * @returns The converted value.
   */
  fromAttribute(value: string | null): T;
  /**
   * Coerce an input value to the property type.
   *
   * @param value - The input value.
   * @returns The coerced value.
   */
  coerceValue(value: any): T;
  /**
   * Sets the attribute for the given value.
   *
   * @param elt - The element to set the attribute on
   * @param attribute - The name of the attribute to set
   * @param value - The value to be set (must have been coerced to the appropriate type already)
   */
  setAttribute(elt: Element, attribute: string, value: T): void;
}

export interface ReflectNumberOptions {
  defaultValue?: number;
}
export interface ReflectClampedIntOptions extends ReflectNumberOptions {
  min: number;
  max: number;
}

/**
 * A reflector for an attribute of type `DOMString`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 */
export declare const reflectString: Reflector<string>;

/**
 * A reflector for an attribute of type `USVString` representing a URL.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring-5 | the HTML specification}
 */
export declare const reflectURL: {
  /**
   * Convert from the attribute value to the IDL value.
   *
   * This implements the _getter_ steps from the algorithm, except that the value has already been read from attribute.
   *
   * Contrary to other _reflectors_, this must be called at the time the property is read.
   *
   * @param elt - The element the attribute value comes from
   * @param value The attribute value, or `null` if the attribute is absent.
   * @returns The converted value.
   */
  fromAttribute(elt: Element, value: string | null): string;
  /** {@inheritDoc Reflector.coerceValue} */
  coerceValue(value: any): string;
  /** {@inheritDoc Reflector.setAttribute} */
  setAttribute(elt: Element, attribute: string, value: string): void;
};

/**
 * Returns a reflector for an enumerated attribute of type `DOMString`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 */
export declare function reflectEnum<
  Keywords extends string,
  Aliases extends string,
>(options: EnumeratedAttributeOptions<Keywords, Aliases>): Reflector<Keywords>;
/**
 * Returns a reflector for an enumerated attribute of type nullable `DOMString`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 */
export declare function reflectNullableEnum<
  Keywords extends string,
  Aliases extends string,
>(
  options: EnumeratedAttributeOptions<Keywords, Aliases>,
): Reflector<Keywords | null>;

/**
 * A reflector for an attribute of type `boolean`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-boolean | the HTML specification}
 */
export declare const reflectBoolean: Reflector<boolean>;

/**
 * Returns a reflector for an attribute of type `long`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-long | the HTML specification}
 */
export declare function reflectInt(
  options: ReflectNumberOptions,
): Reflector<number>;
/**
 * Returns a reflector for an attribute of type `long` limited to only non-negative numbers.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-long | the HTML specification}
 */
export declare function reflectNonNegativeInt(
  options?: ReflectNumberOptions,
): Reflector<number>;

/**
 * Returns a reflector for an attribute of type `unsigned long`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 */
export declare function reflectUnsignedInt(
  options?: ReflectNumberOptions,
): Reflector<number>;
/**
 * Returns a reflector for an attribute of type `unsigned long` limited to only positive numbers.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 */
export declare function reflectPositiveInt(
  options?: ReflectNumberOptions,
): Reflector<number>;
/**
 * Returns a reflector for an attribute of type `unsigned long` limited to only positive numbers with fallback.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 */
export declare function reflectPositiveIntWithFallback(
  options?: ReflectNumberOptions,
): Reflector<number>;
/**
 * Returns a reflector for an attribute of type `unsigned long` clamped to a given range.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 */
export declare function reflectClampedInt(
  options: ReflectClampedIntOptions,
): Reflector<number>;

/**
 * Returns a reflector for an attribute of type `double`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-double | the HTML specification}
 */
export declare function reflectDouble(
  options: ReflectNumberOptions,
): Reflector<number>;
/**
 * Returns a reflector for an attribute of type `double` limited to only positive values.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-double | the HTML specification}
 */
export declare function reflectPositiveDouble(
  options?: ReflectNumberOptions,
): Reflector<number>;

/**
 * Implements the steps for [reflecting content attributes in IDL attributes](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes)
 * from the HTML specification, for element references (`T?` or `FrozenArray<T>?`, where `T extends Element`).
 */
export interface StatefulReflector<T extends Element | readonly Element[]> {
  /**
   * Computes and returns the referenced element(s).
   *
   * This implements the _getter_ steps from the algorithm, except that the value has already been read from attribute.
   */
  get(): T | null;
  /**
   * Updates the internal state with the attribute value.
   *
   * @param value - The attribute value, or `null` if the attribute is absent.
   */
  fromAttribute(value: string | null): void;
  /** {@inheritDoc Reflector.coerceValue} */
  coerceValue(value: any): T | null;
  /**
   * Sets the attribute for the given value.
   *
   * @param attribute - The name of the attribute to set
   * @param value - The value to be set (must have been coerced to the appropriate type already)
   */
  setAttribute(attribute: string, value: T | null): void;
}

/**
 * Returns a stateful reflector for an attribute of type `T?` where `T` is or extends `Element`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:element | the HTML specification}
 */
export declare const reflectElementReference: {
  (element: HTMLElement): StatefulReflector<Element>;
  <T extends Element>(
    element: HTMLElement,
    type: { new (): T; prototype: T },
  ): StatefulReflector<T>;
};

/**
 * Returns a reflector for an attribute of type `FrozenArray<T>?` where `T` is or extends `Element`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:element-3 | the HTML specification}
 */
export declare const reflectElementReferences: {
  (element: HTMLElement): StatefulReflector<readonly Element[]>;
  <T extends Element>(
    element: HTMLElement,
    type: { new (): T; prototype: T },
  ): StatefulReflector<readonly T[]>;
};

export interface ReflectElementReferenceOptions<T extends Element> {
  type?: { new (): T; prototype: T };
}

// TBC: tokenlist
