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
 * @typedef {import("@platformer/types").ReflectOptions} ReflectOptions
 */
/**
 * @template T
 * @typedef {import("@platformer/types").ClassAccessorOrSetterDecorator<T>} ClassAccessorOrSetterDecorator
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

const ATTRIBUTES = Symbol();

/** @type {import("./cached.d.ts").getObservedAttributes} */
export function getObservedAttributes(cls) {
  return Object.keys(cls[Symbol.metadata]?.[ATTRIBUTES] ?? {});
}

/** @type {import("./cached.d.ts").reflectAttributeToProperty} */
export function reflectAttributeToProperty(elt, name, oldValue, newValue) {
  if (oldValue === newValue) {
    return;
  }
  const mapper = elt.constructor[Symbol.metadata]?.[ATTRIBUTES]?.[name];
  mapper?.call(elt, newValue);
}

/** @type {import("./cached.d.ts").BaseElement} */
export class BaseElement extends HTMLElement {
  static get observedAttributes() {
    return getObservedAttributes(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    reflectAttributeToProperty(this, name, oldValue, newValue);
  }
}

/**
 * @template T
 * @param {string=} attribute
 * @param {Reflector<T>} reflector
 * @returns {ClassAccessorOrSetterDecorator<T>}
 */
function reflectImpl(
  attribute,
  { defaultValue, fromAttribute, coerceValue, setAttribute },
) {
  return function (target, context) {
    validateContext(context);
    attribute ??= context.name.toLowerCase();
    switch (context.kind) {
      case "accessor": {
        const { set } = target;
        // Make a copy to make sure we're not modifying metadata
        // inherited from a super class
        context.metadata[ATTRIBUTES] = {
          ...(context.metadata[ATTRIBUTES] ?? {}),
          [attribute](value) {
            set.call(this, fromAttribute(value));
          },
        };
        return {
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
        // Make a copy to make sure we're not modifying metadata
        // inherited from a super class
        context.metadata[ATTRIBUTES] = {
          ...(context.metadata[ATTRIBUTES] ?? {}),
          [attribute](value) {
            target.call(this, fromAttribute(value));
          },
        };
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
 * @returns {(options?: ReflectOptions) => ClassAccessorOrSetterDecorator<T>}
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
 * @returns {(options: ReflectOptions & Options) => ClassAccessorOrSetterDecorator<T>}
 */
function reflectWithOptions(reflectorFactory, requiredOptions = false) {
  return function (
    { attribute, ...options } = requiredOptions ? undefined : {},
  ) {
    return reflectImpl(attribute, reflectorFactory(options));
  };
}

/** @type {import("@platformer/types").reflectString} */
export const reflectString = reflect(reflectStringReflector);

/** @type {import("@platformer/types").reflectURL} */
export function reflectURL({ attribute } = {}) {
  const { fromAttribute, coerceValue, setAttribute } = reflectURLReflector;
  return function ({ get, set }, context) {
    validateContext(context);
    attribute ??= context.name.toLowerCase();
    // Make a copy to make sure we're not modifying metadata
    // inherited from a super class
    context.metadata[ATTRIBUTES] = {
      ...(context.metadata[ATTRIBUTES] ?? {}),
      [attribute](value) {
        set.call(this, value);
      },
    };
    return {
      get() {
        return fromAttribute(this, get.call(this));
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

/** @type {import("@platformer/types").reflectEnum} */
export const reflectEnum = reflectWithOptions(
  reflectEnumReflectorFactory,
  true,
);
/** @type {import("@platformer/types").reflectNullableEnum} */
export const reflectNullableEnum = reflectWithOptions(
  reflectNullableEnumReflectorFactory,
  true,
);

/** @type {import("@platformer/types").reflectBoolean} */
export const reflectBoolean = reflect(reflectBooleanReflector);

/** @type {import("@platformer/types").reflectInt} */
export const reflectInt = reflectWithOptions(reflectIntReflectorFactory);
/** @type {import("@platformer/types").reflectNonNegativeInt} */
export const reflectNonNegativeInt = reflectWithOptions(
  reflectNonNegativeIntReflectorFactory,
);

/** @type {import("@platformer/types").reflectUnsignedInt} */
export const reflectUnsignedInt = reflectWithOptions(
  reflectUnsignedIntReflectorFactory,
);
/** @type {import("@platformer/types").reflectPositiveInt} */
export const reflectPositiveInt = reflectWithOptions(
  reflectPositiveIntReflectorFactory,
);
/** @type {import("@platformer/types").reflectPositiveIntWithFallback} */
export const reflectPositiveIntWithFallback = reflectWithOptions(
  reflectPositiveIntWithFallbackReflectorFactory,
);
/** @type {import("@platformer/types").reflectClampedInt} */
export const reflectClampedInt = reflectWithOptions(
  reflectClampedIntReflectorFactory,
  true,
);

/** @type {import("@platformer/types").reflectDouble} */
export const reflectDouble = reflectWithOptions(reflectDoubleReflectorFactory);
/** @type {import("@platformer/types").reflectPositiveDouble} */
export const reflectPositiveDouble = reflectWithOptions(
  reflectPositiveDoubleReflectorFactory,
);
