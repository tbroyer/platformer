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
 * @typedef {import("@platformer/reflect-lit").ReflectOptions} ReflectOptions
 */
/**
 * @template T
 * @typedef {import("@platformer/reflect-lit").ReflectDecorator<T>} ReflectDecorator
 */

/**
 * @param {ClassAccessorDecoratorContext} context
 */
function validateContext(context) {
  if (
    (context.kind !== "accessor" && context.kind !== "setter") ||
    context.static ||
    context.private
  ) {
    throw new Error(
      "Decorator must be applied to a non-static, non-private auto-accessor property or setter",
    );
  }
}

// polyfill Symbol.metadata
Symbol.metadata ??= Symbol("metadata");

/**
 * @template T
 * @param {string=} attribute
 * @param {Reflector<T>} reflector
 * @returns {ReflectDecorator<T>}
 */
function reflectImpl(
  attribute,
  { defaultValue, fromAttribute, coerceValue, setAttribute },
) {
  return function (target, context) {
    validateContext(context);
    attribute ??= context.name.toLowerCase();

    const privateProperty = Symbol(context.name);

    let properties = globalThis.litPropertyMetadata.get(context.metadata);
    if (properties === undefined) {
      globalThis.litPropertyMetadata.set(
        context.metadata,
        (properties = new Map()),
      );
    }
    properties.set(privateProperty, {
      attribute,
      converter: fromAttribute,
    });

    switch (context.kind) {
      case "accessor": {
        context.addInitializer(function () {
          this[privateProperty] = defaultValue;
        });
        return {
          get() {
            return this[privateProperty];
          },
          set(value) {
            value = coerceValue(value);
            setAttribute(this, attribute, value);
          },
          init(value) {
            if (value !== undefined && value !== defaultValue) {
              throw new Error(`Default value must be ${defaultValue}`);
            }
            return defaultValue;
          },
        };
      }
      case "setter":
        context.addInitializer(function () {
          target.call(this, defaultValue);
        });
        return function (value) {
          value = coerceValue(value);
          setAttribute(this, attribute, value);
        };
      default:
        throw new Error(`Unsupported decorator location: ${context.kind}`);
    }
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

/** @type {import("@platformer/reflect-lit").reflectString} */
export const reflectString = reflect(reflectStringReflector);

/** @type {import("@platformer/reflect-lit").reflectURL} */
export function reflectURL({ attribute } = {}) {
  const { fromAttribute, coerceValue, setAttribute } = reflectURLReflector;
  return function (_, context) {
    validateContext(context);
    attribute ??= context.name.toLowerCase();

    const privateProperty = Symbol(context.name);

    let properties = globalThis.litPropertyMetadata.get(context.metadata);
    if (properties === undefined) {
      globalThis.litPropertyMetadata.set(
        context.metadata,
        (properties = new Map()),
      );
    }
    properties.set(privateProperty, {
      attribute,
    });

    return {
      get() {
        return fromAttribute(this, this[privateProperty]);
      },
      set(value) {
        value = coerceValue(value);
        setAttribute(this, attribute, value);
      },
      init(value) {
        if (value != null) {
          throw new Error(`Default value must be null`);
        }
        return null;
      },
    };
  };
}

/** @type {import("@platformer/reflect-lit").reflectEnum} */
export const reflectEnum = reflectWithOptions(
  reflectEnumReflectorFactory,
  true,
);
/** @type {import("@platformer/reflect-lit").reflectNullableEnum} */
export const reflectNullableEnum = reflectWithOptions(
  reflectNullableEnumReflectorFactory,
  true,
);

/** @type {import("@platformer/reflect-lit").reflectBoolean} */
export const reflectBoolean = reflect(reflectBooleanReflector);

/** @type {import("@platformer/reflect-lit").reflectInt} */
export const reflectInt = reflectWithOptions(reflectIntReflectorFactory);
/** @type {import("@platformer/reflect-lit").reflectNonNegativeInt} */
export const reflectNonNegativeInt = reflectWithOptions(
  reflectNonNegativeIntReflectorFactory,
);

/** @type {import("@platformer/reflect-lit").reflectUnsignedInt} */
export const reflectUnsignedInt = reflectWithOptions(
  reflectUnsignedIntReflectorFactory,
);
/** @type {import("@platformer/reflect-lit").reflectPositiveInt} */
export const reflectPositiveInt = reflectWithOptions(
  reflectPositiveIntReflectorFactory,
);
/** @type {import("@platformer/reflect-lit").reflectPositiveIntWithFallback} */
export const reflectPositiveIntWithFallback = reflectWithOptions(
  reflectPositiveIntWithFallbackReflectorFactory,
);
/** @type {import("@platformer/reflect-lit").reflectClampedInt} */
export const reflectClampedInt = reflectWithOptions(
  reflectClampedIntReflectorFactory,
  true,
);

/** @type {import("@platformer/reflect-lit").reflectDouble} */
export const reflectDouble = reflectWithOptions(reflectDoubleReflectorFactory);
/** @type {import("@platformer/reflect-lit").reflectPositiveDouble} */
export const reflectPositiveDouble = reflectWithOptions(
  reflectPositiveDoubleReflectorFactory,
);
