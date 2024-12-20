import {
  reflectString as reflectStringReflector,
  reflectURL as reflectURLReflector,
  reflectEnum as reflectEnumReflectorFactory,
  reflectNullableEnum as reflectNullableEnumReflectorFactory,
  reflectBoolean as reflectBooleanReflector,
  reflectInt as reflectIntReflectorFactory,
  reflectNonNegativeInt as reflectNonNegativeIntReflectorFactory,
  reflectUnsignedInt as reflectUnsignedIntReflectorFactory,
  reflectPositiveInt as reflectPositiveIntReflectorFactory,
  reflectPositiveIntWithFallback as reflectPositiveIntWithFallbackReflectorFactory,
  reflectClampedInt as reflectClampedIntReflectorFactory,
  reflectDouble as reflectDoubleReflectorFactory,
  reflectPositiveDouble as reflectPositiveDoubleReflectorFactory,
} from "@platformer/reflect";

/**
 * @template T
 * @typedef {import("@platformer/reflect").Reflector<T>} Reflector
 */
/**
 * @typedef {import("@platformer/reflect-vanilla").ReflectOptions} ReflectOptions
 */
/**
 * @template T
 * @typedef {import("@platformer/reflect-vanilla").ReflectDecorator<T>} ReflectDecorator
 */

/**
 * @param {ClassAccessorDecoratorContext} context
 */
function validateContext(context) {
  if (context.kind !== "accessor" || context.static || context.private) {
    throw new Error(
      "Decorator must be applied to a non-static, non-private auto-accessor property",
    );
  }
}

/**
 * @template T
 * @param {string=} attribute
 * @param {Reflector<T>} reflector
 * @returns {ReflectDecorator<T>}
 */
function reflectImpl(attribute, { fromAttribute, coerceValue, setAttribute }) {
  return function (_, context) {
    validateContext(context);
    attribute ??= context.name.toLowerCase();
    return {
      get() {
        return fromAttribute(this.getAttribute(attribute));
      },
      set(value) {
        setAttribute(this, attribute, coerceValue(value));
      },
    };
  };
}

/**
 * @template T
 * @param {Reflector<T>} reflector
 * @returns {(options?: ReflectOptions) => ReflectDecorator<T>}
 */
function reflect(reflector) {
  return function ({ attribute } = {}) {
    return reflectImpl(attribute, reflector);
  };
}
/**
 * @template T
 * @template Options
 * @param {(options: Options) => Reflector<T>} reflectorFactory
 * @param {boolean=} requiredOptions
 * @returns {(options: ReflectOptions & Options) => ReflectDecorator<T>}
 */
function reflectWithOptions(reflectorFactory, requiredOptions = false) {
  return function (
    { attribute, ...options } = requiredOptions ? undefined : {},
  ) {
    return reflectImpl(attribute, reflectorFactory(options));
  };
}

/** @type {import("@platformer/reflect-vanilla").reflectString} */
export const reflectString = reflect(reflectStringReflector);

/** @type {import("@platformer/reflect-vanilla").reflectURL} */
export function reflectURL({ attribute } = {}) {
  return function (_, context) {
    validateContext(context);
    attribute ??= context.name.toLowerCase();
    return {
      get() {
        return reflectURLReflector.fromAttribute(
          this,
          this.getAttribute(attribute),
        );
      },
      set(value) {
        value = reflectURLReflector.coerceValue(value);
        reflectURLReflector.setAttribute(this, attribute, value);
      },
    };
  };
}

/** @type {import("@platformer/reflect-vanilla").reflectEnum} */
export const reflectEnum = reflectWithOptions(
  reflectEnumReflectorFactory,
  true,
);
/** @type {import("@platformer/reflect-vanilla").reflectNullableEnum} */
export const reflectNullableEnum = reflectWithOptions(
  reflectNullableEnumReflectorFactory,
  true,
);

/** @type {import("@platformer/reflect-vanilla").reflectBoolean} */
export const reflectBoolean = reflect(reflectBooleanReflector);

/** @type {import("@platformer/reflect-vanilla").reflectInt} */
export const reflectInt = reflectWithOptions(reflectIntReflectorFactory);
/** @type {import("@platformer/reflect-vanilla").reflectNonNegativeInt} */
export const reflectNonNegativeInt = reflectWithOptions(
  reflectNonNegativeIntReflectorFactory,
);

/** @type {import("@platformer/reflect-vanilla").reflectUnsignedInt} */
export const reflectUnsignedInt = reflectWithOptions(
  reflectUnsignedIntReflectorFactory,
);
/** @type {import("@platformer/reflect-vanilla").reflectPositiveInt} */
export const reflectPositiveInt = reflectWithOptions(
  reflectPositiveIntReflectorFactory,
);
/** @type {import("@platformer/reflect-vanilla").reflectPositiveIntWithFallback} */
export const reflectPositiveIntWithFallback = reflectWithOptions(
  reflectPositiveIntWithFallbackReflectorFactory,
);
/** @type {import("@platformer/reflect-vanilla").reflectClampedInt} */
export const reflectClampedInt = reflectWithOptions(
  reflectClampedIntReflectorFactory,
  true,
);

/** @type {import("@platformer/reflect-vanilla").reflectDouble} */
export const reflectDouble = reflectWithOptions(reflectDoubleReflectorFactory);
/** @type {import("@platformer/reflect-vanilla").reflectPositiveDouble} */
export const reflectPositiveDouble = reflectWithOptions(
  reflectPositiveDoubleReflectorFactory,
);
