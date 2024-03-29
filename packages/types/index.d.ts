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

interface ClassAccessorOrSetterDecorator<Value>
  extends ClassAccessorDecorator<Value> {
  <This extends HTMLElement>(
    target: (this: This, value: Value) => void,
    context: ClassSetterDecoratorContext<This, Value>,
  ): (this: This, value: Value) => void;
}

/**
 * Implements the property to reflect a DOM attribute as a `DOMString`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectString(
  options?: ReflectOptions,
): ClassAccessorOrSetterDecorator<string>;

/**
 * Implements the property to reflect a DOM attribute as a `USVString` representing a URL.
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
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectEnum<Keywords extends string, Aliases extends string>(
  options: ReflectOptions & EnumeratedAttributeOptions<Keywords, Aliases>,
): ClassAccessorOrSetterDecorator<Keywords>;

/**
 * Implements the property to reflect an enumerated DOM attribute as a nullable `DOMString`.
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
): ClassAccessorOrSetterDecorator<Keywords | null>;

/**
 * Implements the property to reflect a DOM attribute as a `boolean`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-boolean | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectBoolean(
  options?: ReflectOptions,
): ClassAccessorOrSetterDecorator<boolean>;

/**
 * Implements the property to reflect a DOM attribute as a `long`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorOrSetterDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as a `long` limited to only non-negative numbers.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectNonNegativeInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorOrSetterDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectUnsignedInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorOrSetterDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long` limited to only positive numbers.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectPositiveInt(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorOrSetterDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long` limited to only positive numbers with fallback.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectPositiveIntWithFallback(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorOrSetterDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as an `unsigned long` clamped to a given range.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-unsigned-long | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectClampedInt(
  options: ReflectOptions & ReflectClampedIntOptions,
): ClassAccessorOrSetterDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as a `double`.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-double | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectDouble(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorOrSetterDecorator<number>;

/**
 * Implements the property to reflect a DOM attribute as a `double` limited to only positive numbers.
 *
 * @see {@link https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-double | the HTML specification}
 *
 * @param options Options of the reflected property, including the DOM attribute name.
 */
export function reflectPositiveDouble(
  options?: ReflectOptions & ReflectNumberOptions,
): ClassAccessorOrSetterDecorator<number>;

// TBC: tokenlist, element, frozen array of elements
