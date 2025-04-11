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
  reflectElementReference as reflectElementReferenceReflectorFactory,
  reflectElementReferences as reflectElementReferencesReflectorFactory,
} from "@platformer/reflect";
import { addAttribute } from "@platformer/vanilla-core";

export {
  BaseElement,
  getObservedAttributes,
  reflectAttributeToProperty,
} from "@platformer/vanilla-core";

function addObservedAttribute(metadata, name, target, fromAttribute) {
  addAttribute(metadata, name, function (oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    target.call(this, fromAttribute(newValue));
  });
}

/**
 * @template T
 * @typedef {import("@platformer/reflect").Reflector<T>} Reflector
 */
/**
 * @typedef {import("@platformer/reflect-vanilla/cached.js").ReflectOptions} ReflectOptions
 */
/**
 * @template T
 * @typedef {import("@platformer/reflect-vanilla/cached.js").ReflectDecorator<T>} ReflectDecorator
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
    switch (context.kind) {
      case "accessor": {
        const { set } = target;
        addObservedAttribute(context.metadata, attribute, set, fromAttribute);
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
        addObservedAttribute(
          context.metadata,
          attribute,
          target,
          fromAttribute,
        );
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

/** @type {import("@platformer/reflect-vanilla/cached.js").reflectString} */
export const reflectString = reflect(reflectStringReflector);

/** @type {import("@platformer/reflect-vanilla/cached.js").reflectURL} */
export function reflectURL({ attribute } = {}) {
  const { fromAttribute, coerceValue, setAttribute } = reflectURLReflector;
  return function ({ get, set }, context) {
    validateContext(context);
    attribute ??= context.name.toLowerCase();
    addAttribute(context.metadata, attribute, function (_, newValue) {
      set.call(this, newValue);
    });
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

/** @type {import("@platformer/reflect-vanilla/cached.js").reflectEnum} */
export const reflectEnum = reflectWithOptions(
  reflectEnumReflectorFactory,
  true,
);
/** @type {import("@platformer/reflect-vanilla/cached.js").reflectNullableEnum} */
export const reflectNullableEnum = reflectWithOptions(
  reflectNullableEnumReflectorFactory,
  true,
);

/** @type {import("@platformer/reflect-vanilla/cached.js").reflectBoolean} */
export const reflectBoolean = reflect(reflectBooleanReflector);

/** @type {import("@platformer/reflect-vanilla/cached.js").reflectInt} */
export const reflectInt = reflectWithOptions(reflectIntReflectorFactory);
/** @type {import("@platformer/reflect-vanilla/cached.js").reflectNonNegativeInt} */
export const reflectNonNegativeInt = reflectWithOptions(
  reflectNonNegativeIntReflectorFactory,
);

/** @type {import("@platformer/reflect-vanilla/cached.js").reflectUnsignedInt} */
export const reflectUnsignedInt = reflectWithOptions(
  reflectUnsignedIntReflectorFactory,
);
/** @type {import("@platformer/reflect-vanilla/cached.js").reflectPositiveInt} */
export const reflectPositiveInt = reflectWithOptions(
  reflectPositiveIntReflectorFactory,
);
/** @type {import("@platformer/reflect-vanilla/cached.js").reflectPositiveIntWithFallback} */
export const reflectPositiveIntWithFallback = reflectWithOptions(
  reflectPositiveIntWithFallbackReflectorFactory,
);
/** @type {import("@platformer/reflect-vanilla/cached.js").reflectClampedInt} */
export const reflectClampedInt = reflectWithOptions(
  reflectClampedIntReflectorFactory,
  true,
);

/** @type {import("@platformer/reflect-vanilla/cached.js").reflectDouble} */
export const reflectDouble = reflectWithOptions(reflectDoubleReflectorFactory);
/** @type {import("@platformer/reflect-vanilla/cached.js").reflectPositiveDouble} */
export const reflectPositiveDouble = reflectWithOptions(
  reflectPositiveDoubleReflectorFactory,
);

/**
 * @template T
 * @typedef {import("@platformer/reflect").StatefulReflector<T>} StatefulReflector
 */
/**
 * @template T
 * @typedef {import("@platformer/reflect-vanilla/cached.js").ReflectStatefulDecorator<T>} ReflectStatefulDecorator
 */

const STATEFUL_REFLECTORS = Symbol();

// XXX: typing is not accurate, but just enough to get some useful help in editor
/**
 * @template T
 * @param {(element: HTMLElement, type?: { new(): T, prototype: T }) => StatefulReflector<T>} reflectorFactory
 * @param {string} suffix
 * @returns {(options: ReflectOptions & { type?: { new(): T, prototype: T }}) => ReflectStatefulDecorator<T>}
 */
function reflectStateful(reflectorFactory, suffix) {
  return function ({ attribute, type } = {}) {
    return function (_, context) {
      validateContext(context);
      const { name } = context;
      attribute ??= stripSuffix(name, suffix).toLowerCase();
      context.addInitializer(function () {
        (this[STATEFUL_REFLECTORS] ??= {})[name] = reflectorFactory(this, type);
      });
      addAttribute(context.metadata, attribute, function (_, newValue) {
        this[STATEFUL_REFLECTORS][name].fromAttribute(newValue);
      });
      return {
        get() {
          return this[STATEFUL_REFLECTORS][name].get();
        },
        set(value) {
          const reflector = this[STATEFUL_REFLECTORS][name];
          value = reflector.coerceValue(value);
          reflector.setAttribute(attribute, value);
        },
        init(value) {
          if (value != null) {
            throw new Error(`Default value must be null`);
          }
          return null;
        },
      };
    };
  };
}

/**
 * @param {string} name
 * @param {string} suffix
 */
function stripSuffix(name, suffix) {
  if (name.endsWith(suffix)) {
    return name.slice(0, -suffix.length);
  } else {
    return name;
  }
}

/** @type {import("@platformer/reflect-vanilla/cached.js").reflectElementReference} */
export const reflectElementReference = reflectStateful(
  reflectElementReferenceReflectorFactory,
  "Element",
);

/** @type {import("@platformer/reflect-vanilla/cached.js").reflectElementReferences} */
export const reflectElementReferences = reflectStateful(
  reflectElementReferencesReflectorFactory,
  "Elements",
);
