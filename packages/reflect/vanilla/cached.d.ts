import type {
  EnumeratedAttributeOptions,
  ReflectNumberOptions,
  ReflectClampedIntOptions,
  ReflectElementReferenceOptions,
} from "@platformer/reflect";

export type {
  EnumeratedAttributeOptions,
  ReflectNumberOptions,
  ReflectClampedIntOptions,
  ReflectElementReferenceOptions,
};

export type {
  BaseElement,
  getObservedAttributes,
  reflectAttributeToProperty,
} from "@platformer/vanilla-core";

export interface ReflectOptions {
  /** Name of the DOM attribute that the annotated property reflects. Defaults to the lowercased property name. */
  attribute?: string;
}

export interface ReflectDecorator<Value> {
  <This extends HTMLElement>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>,
  ): ClassAccessorDecoratorResult<This, Value>;
  <This extends HTMLElement>(
    target: (this: This, value: Value) => void,
    context: ClassSetterDecoratorContext<This, Value>,
  ): (this: This, value: Value) => void;
}

export interface ReflectURLDecorator {
  <This extends HTMLElement>(
    target: ClassAccessorDecoratorTarget<This, string>,
    context: ClassAccessorDecoratorContext<This, string>,
  ): ClassAccessorDecoratorResult<This, string>;
}

/**
 * Implements the property to reflect a DOM attribute as a `DOMString`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectString(
  options?: ReflectOptions,
): ReflectDecorator<string>;

/**
 * Implements the property to reflect a DOM attribute as a `USVString` representing a URL.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring-5 | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectURL(
  options?: ReflectOptions,
): ReflectURLDecorator;

/**
 * Implements the property to reflect an enumerated DOM attribute as a `DOMString`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectEnum<
  Keywords extends string,
  Aliases extends string,
>(
  options: ReflectOptions & EnumeratedAttributeOptions<Keywords, Aliases>,
): ReflectDecorator<Keywords>;

/**
 * Implements the property to reflect an enumerated DOM attribute as a nullable `DOMString`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectNullableEnum<
  Keywords extends string,
  Aliases extends string,
>(
  options: ReflectOptions & EnumeratedAttributeOptions<Keywords, Aliases>,
): ReflectDecorator<Keywords | null>;

/**
 * Implements the property to reflect a DOM attribute as a `boolean`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-boolean | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectBoolean(
  options?: ReflectOptions,
): ReflectDecorator<boolean>;

/**
 * Implements the property to reflect a DOM attribute as a `long`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as a `long` limited to only non-negative numbers.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectNonNegativeInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectUnsignedInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long` limited to only positive numbers.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectPositiveInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long` limited to only positive numbers with fallback.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectPositiveIntWithFallback(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long` clamped to a given range.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectClampedInt(
  options: ReflectOptions & ReflectClampedIntOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as a `double`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-double | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectDouble(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as a `double` limited to only positive numbers.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-double | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export declare function reflectPositiveDouble(
  options?: ReflectOptions & ReflectNumberOptions,
): ReflectDecorator<number>;

export interface ReflectStatefulDecorator<Value> {
  <This extends HTMLElement>(
    target: ClassAccessorDecoratorTarget<This, Value | null>,
    context: ClassAccessorDecoratorContext<This, Value | null>,
  ): ClassAccessorDecoratorResult<This, Value | null>;
}

export declare function reflectElementReference<Value extends Element>(
  options?: ReflectOptions & ReflectElementReferenceOptions<Value>,
): ReflectStatefulDecorator<Value>;

export declare function reflectElementReferences<Value extends Element>(
  options?: ReflectOptions & ReflectElementReferenceOptions<Value>,
): ReflectStatefulDecorator<readonly Value[]>;

// TBC: tokenlist
