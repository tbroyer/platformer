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
  reflectDOMTokenList as reflectDOMTokenListReflectorFactory,
} from "@webfeet/reflect";

/**
 * @template T
 * @typedef {import("@webfeet/reflect").Reflector<T>} Reflector
 */
/**
 * @typedef {import("@webfeet/reflect-lit").ReflectOptions} ReflectOptions
 */
/**
 * @template T
 * @typedef {import("@webfeet/reflect-lit").ReflectDecorator<T>} ReflectDecorator
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

/** @type {import("@webfeet/reflect-lit").reflectString} */
export const reflectString = reflect(reflectStringReflector);

/** @type {import("@webfeet/reflect-lit").reflectURL} */
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

/** @type {import("@webfeet/reflect-lit").reflectEnum} */
export const reflectEnum = reflectWithOptions(
  reflectEnumReflectorFactory,
  true,
);
/** @type {import("@webfeet/reflect-lit").reflectNullableEnum} */
export const reflectNullableEnum = reflectWithOptions(
  reflectNullableEnumReflectorFactory,
  true,
);

/** @type {import("@webfeet/reflect-lit").reflectBoolean} */
export const reflectBoolean = reflect(reflectBooleanReflector);

/** @type {import("@webfeet/reflect-lit").reflectInt} */
export const reflectInt = reflectWithOptions(reflectIntReflectorFactory);
/** @type {import("@webfeet/reflect-lit").reflectNonNegativeInt} */
export const reflectNonNegativeInt = reflectWithOptions(
  reflectNonNegativeIntReflectorFactory,
);

/** @type {import("@webfeet/reflect-lit").reflectUnsignedInt} */
export const reflectUnsignedInt = reflectWithOptions(
  reflectUnsignedIntReflectorFactory,
);
/** @type {import("@webfeet/reflect-lit").reflectPositiveInt} */
export const reflectPositiveInt = reflectWithOptions(
  reflectPositiveIntReflectorFactory,
);
/** @type {import("@webfeet/reflect-lit").reflectPositiveIntWithFallback} */
export const reflectPositiveIntWithFallback = reflectWithOptions(
  reflectPositiveIntWithFallbackReflectorFactory,
);
/** @type {import("@webfeet/reflect-lit").reflectClampedInt} */
export const reflectClampedInt = reflectWithOptions(
  reflectClampedIntReflectorFactory,
  true,
);

/** @type {import("@webfeet/reflect-lit").reflectDouble} */
export const reflectDouble = reflectWithOptions(reflectDoubleReflectorFactory);
/** @type {import("@webfeet/reflect-lit").reflectPositiveDouble} */
export const reflectPositiveDouble = reflectWithOptions(
  reflectPositiveDoubleReflectorFactory,
);
/**
 * @template T
 * @typedef {import("@webfeet/reflect").ElementReferenceReflector<T>} ElementReferenceReflector
 */
/**
 * @template T
 * @typedef {import("@webfeet/reflect-lit").ReflectElementReferenceDecorator<T>} ReflectElementReferenceDecorator
 */

const ELEMENT_REFERENCE_REFLECTORS = Symbol();

// XXX: typing is not accurate, but just enough to get some useful help in editor
/**
 * @template T
 * @param {(element: HTMLElement, type?: { new(): T, prototype: T }) => ElementReferenceReflector<T>} reflectorFactory
 * @param {string} suffix
 * @returns {(options: ReflectOptions & { type?: { new(): T, prototype: T }}) => ReflectElementReferenceDecorator<T>}
 */
function reflectElementReferenceImpl(reflectorFactory, suffix) {
  return function ({ attribute, type } = {}) {
    return function (_, context) {
      validateContext(context);
      const { name } = context;
      attribute ??= stripSuffix(name, suffix).toLowerCase();

      const privateProperty = Symbol(name);
      context.addInitializer(function () {
        const reflector = reflectorFactory(this, type);
        (this[ELEMENT_REFERENCE_REFLECTORS] ??= {})[name] = reflector;
        Object.defineProperty(this, privateProperty, {
          set(value) {
            reflector.fromAttribute(value);
          },
        });
      });

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
          return this[ELEMENT_REFERENCE_REFLECTORS][name].get();
        },
        set(value) {
          const reflector = this[ELEMENT_REFERENCE_REFLECTORS][name];
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

/** @type {import("@webfeet/reflect-lit").reflectElementReference} */
export const reflectElementReference = reflectElementReferenceImpl(
  reflectElementReferenceReflectorFactory,
  "Element",
);

/** @type {import("@webfeet/reflect-lit").reflectElementReferences} */
export const reflectElementReferences = reflectElementReferenceImpl(
  reflectElementReferencesReflectorFactory,
  "Elements",
);

/**
 * @template T
 * @typedef {import("@webfeet/reflect").DOMTokenListReflector} DOMTokenListReflector
 */
/**
 * @template T
 * @typedef {import("@webfeet/reflect-lit").ReflectDOMTokenListDecorator} ReflectDOMTokenListDecorator
 */

const DOM_TOKEN_LIST_REFLECTORS = Symbol();

/** @type {import("@webfeet/reflect-lit").reflectDOMTokenList} */
export function reflectDOMTokenList({ attribute, supportedTokens } = {}) {
  return function (target, context) {
    validateContext(context);
    const { name } = context;
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

    switch (context.kind) {
      case "accessor":
        context.addInitializer(function () {
          Object.defineProperty(this, privateProperty, {
            set(value) {
              this[DOM_TOKEN_LIST_REFLECTORS][name].fromAttribute(value);
            },
          });
        });
        return {
          set(value) {
            this[DOM_TOKEN_LIST_REFLECTORS][name].value = value;
          },
          init(value) {
            if (value !== undefined) {
              throw new Error(`Default value must not be set`);
            }
            const reflector = reflectDOMTokenListReflectorFactory(
              this,
              attribute,
              supportedTokens,
            );
            (this[DOM_TOKEN_LIST_REFLECTORS] ??= {})[name] = reflector;
            return reflector.value;
          },
        };
      case "getter":
        context.addInitializer(function () {
          const reflector = reflectDOMTokenListReflectorFactory(
            this,
            attribute,
            supportedTokens,
          );
          (this[DOM_TOKEN_LIST_REFLECTORS] ??= {})[name] = reflector;
          Object.defineProperty(this, privateProperty, {
            set(value) {
              reflector.fromAttribute(value);
            },
          });
        });
        return function () {
          this[DOM_TOKEN_LIST_REFLECTORS][name].value;
        };
      default:
        throw new Error(`Unsupported decorator location: ${context.kind}`);
    }
  };
}
