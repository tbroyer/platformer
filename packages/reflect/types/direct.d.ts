import type {
  ReflectNumberOptions,
  ReflectClampedIntOptions,
} from "@platformer/reflect";
import type { EnumeratedAttributeOptions } from "@platformer/microsyntaxes";

interface ReflectOptions {
  /** Name of the DOM attribute that the annotated property reflects. Defaults to the lowercased property name. */
  attribute?: string;
}

interface ClassAccessorDecorator<Value> {
  <This extends HTMLElement>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>,
  ): ClassAccessorDecoratorResult<This, Value>;
}

/**
 * Implements the property to reflect a DOM attribute as a `DOMString`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectString(
  options?: ReflectOptions,
): ClassAccessorDecorator<string>;

/**
 * Implements the property to reflect a DOM attribute as a `USVString` representing a URL.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring-5 | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectURL(
  options?: ReflectOptions,
): ClassAccessorDecorator<string>;

/**
 * Implements the property to reflect an enumerated DOM attribute as a `DOMString`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectEnum<Keywords extends string, Aliases extends string>(
  options: ReflectOptions & EnumeratedAttributeOptions<Keywords, Aliases>,
): ClassAccessorDecorator<Keywords>;

/**
 * Implements the property to reflect an enumerated DOM attribute as a nullable `DOMString`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectNullableEnum<
  Keywords extends string,
  Aliases extends string,
>(
  options: ReflectOptions & EnumeratedAttributeOptions<Keywords, Aliases>,
): ClassAccessorDecorator<Keywords | null>;

/**
 * Implements the property to reflect a DOM attribute as a `boolean`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-boolean | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectBoolean(
  options?: ReflectOptions,
): ClassAccessorDecorator<boolean>;

/**
 * Implements the property to reflect a DOM attribute as a `long`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as a `long` limited to only non-negative numbers.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectNonNegativeInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectUnsignedInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long` limited to only positive numbers.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectPositiveInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long` limited to only positive numbers with fallback.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectPositiveIntWithFallback(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long` clamped to a given range.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectClampedInt(
  options: ReflectOptions & ReflectClampedIntOptions,
): ClassAccessorDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as a `double`.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-double | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectDouble(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as a `double` limited to only positive numbers.
 *
 * The annotated property's accessors are entirely implemented by this decorator,
 * any decorator applied **after** this one will thus have no effect on the property
 * getter and setter (they could still add initializers).
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-double | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectPositiveDouble(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorDecorator<number>;

// TBC: tokenlist, element, frozen array of elements
