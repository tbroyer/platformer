import {
  coerceToDOMString,
  coerceToUSVString,
  coerceToBoolean,
  coerceToLong,
  coerceToUnsignedLong,
  coerceToDouble,
  coerceToInterface,
  coerceToFrozenArray,
} from "@platformer/webidl";
import {
  enumerated,
  parseInteger,
  parseNonNegativeInteger,
  parseDouble,
} from "@platformer/microsyntaxes";

/** @type {import("./index.d.ts").reflectString} */
export const reflectString = Object.freeze({
  defaultValue: "",
  fromAttribute(value) {
    return String(value ?? "");
  },
  coerceValue: coerceToDOMString,
  setAttribute(elt, attribute, value) {
    elt.setAttribute(attribute, value);
  },
});

/** @type {import("./index.d.ts").reflectURL} */
export const reflectURL = Object.freeze({
  fromAttribute(elt, value) {
    if (value == null) {
      return "";
    }
    try {
      return new URL(value, elt.ownerDocument.baseURI).toString();
    } catch {
      return value;
    }
  },
  coerceValue: coerceToUSVString,
  setAttribute(elt, attribute, value) {
    elt.setAttribute(attribute, value);
  },
});

/** @type {import("./index.d.ts").reflectEnum} */
export function reflectEnum(options) {
  const parseEnum = enumerated(options);
  return Object.freeze({
    defaultValue: options.missing ?? "",
    fromAttribute(value) {
      return parseEnum(value) ?? "";
    },
    coerceValue: coerceToDOMString,
    setAttribute(elt, attribute, value) {
      elt.setAttribute(attribute, value);
    },
  });
}
/** @type {import("./index.d.ts").reflectNullableEnum} */
export function reflectNullableEnum(options) {
  const parseEnum = enumerated(options);
  return Object.freeze({
    defaultValue: options.missing ?? null,
    fromAttribute(value) {
      return parseEnum(value) ?? null;
    },
    coerceValue: (value) => (value == null ? null : coerceToDOMString(value)),
    setAttribute(elt, attribute, value) {
      if (value == null) {
        elt.removeAttribute(attribute);
      } else {
        elt.setAttribute(attribute, value);
      }
    },
  });
}

/** @type {import("./index.d.ts").reflectBoolean} */
export const reflectBoolean = Object.freeze({
  defaultValue: false,
  fromAttribute(value) {
    return value != null;
  },
  coerceValue: coerceToBoolean,
  setAttribute(elt, attribute, value) {
    elt.toggleAttribute(attribute, value);
  },
});

/** @type {import("./index.d.ts").reflectInt} */
export function reflectInt({ defaultValue = 0 } = {}) {
  return Object.freeze({
    defaultValue,
    fromAttribute(value) {
      if (value != null) {
        let parsedValue = parseInteger(value);
        if (
          parsedValue != null &&
          -2147483648 <= parsedValue &&
          parsedValue <= 2147483647
        ) {
          return parsedValue;
        }
      }
      return defaultValue;
    },
    coerceValue: coerceToLong,
    setAttribute(elt, attribute, value) {
      elt.setAttribute(attribute, value);
    },
  });
}
/** @type {import("./index.d.ts").reflectNonNegativeInt} */
export function reflectNonNegativeInt({ defaultValue = -1 } = {}) {
  return Object.freeze({
    defaultValue,
    fromAttribute(value) {
      if (value != null) {
        let parsedValue = parseNonNegativeInteger(value);
        if (parsedValue != null && parsedValue <= 2147483647) {
          return parsedValue;
        }
      }
      return defaultValue;
    },
    coerceValue: coerceToLong,
    setAttribute(elt, attribute, value) {
      if (value < 0) {
        throw new DOMException(undefined, "IndexSizeError");
      }
      elt.setAttribute(attribute, value);
    },
  });
}

/** @type {import("./index.d.ts").reflectUnsignedInt} */
export function reflectUnsignedInt({ defaultValue = 0 } = {}) {
  return Object.freeze({
    defaultValue,
    fromAttribute(value) {
      if (value != null) {
        let parsedValue = parseNonNegativeInteger(value);
        if (
          parsedValue != null &&
          0 <= parsedValue &&
          parsedValue <= 2147483647
        ) {
          return parsedValue;
        }
      }
      return defaultValue;
    },
    coerceValue: coerceToUnsignedLong,
    setAttribute(elt, attribute, value) {
      if (value < 0 || 2147483647 < value) {
        value = defaultValue;
      }
      elt.setAttribute(attribute, value);
    },
  });
}
/** @type {import("./index.d.ts").reflectPositiveInt} */
export function reflectPositiveInt({ defaultValue = 1 } = {}) {
  return Object.freeze({
    defaultValue,
    fromAttribute(value) {
      if (value != null) {
        let parsedValue = parseNonNegativeInteger(value);
        if (
          parsedValue != null &&
          1 <= parsedValue &&
          parsedValue <= 2147483647
        ) {
          return parsedValue;
        }
      }
      return defaultValue;
    },
    coerceValue: coerceToUnsignedLong,
    setAttribute(elt, attribute, value) {
      if (value === 0) {
        throw new DOMException(undefined, "IndexSizeError");
      }
      if (value < 1 || 2147483647 < value) {
        value = defaultValue;
      }
      elt.setAttribute(attribute, value);
    },
  });
}
/** @type {import("./index.d.ts").reflectPositiveIntWithFallback} */
export function reflectPositiveIntWithFallback({ defaultValue = 1 } = {}) {
  return Object.freeze({
    defaultValue,
    fromAttribute(value) {
      if (value != null) {
        let parsedValue = parseNonNegativeInteger(value);
        if (
          parsedValue != null &&
          1 <= parsedValue &&
          parsedValue <= 2147483647
        ) {
          return parsedValue;
        }
      }
      return defaultValue;
    },
    coerceValue: coerceToUnsignedLong,
    setAttribute(elt, attribute, value) {
      if (value < 1 || 2147483647 < value) {
        value = defaultValue;
      }
      elt.setAttribute(attribute, value);
    },
  });
}
/** @type {import("./index.d.ts").reflectClampedInt} */
export function reflectClampedInt({ min, defaultValue, max }) {
  // TODO: validate min, defaultValue, max
  defaultValue ??= min;
  return Object.freeze({
    defaultValue,
    fromAttribute(value) {
      if (value != null) {
        let parsedValue = parseNonNegativeInteger(value);
        if (parsedValue != null) {
          return Math.max(min, Math.min(parsedValue, max));
        }
      }
      return defaultValue;
    },
    coerceValue: coerceToUnsignedLong,
    setAttribute(elt, attribute, value) {
      if (value < 0 || 2147483647 < value) {
        value = defaultValue;
      }
      elt.setAttribute(attribute, value);
    },
  });
}

/** @type {import("./index.d.ts").reflectDouble} */
export function reflectDouble({ defaultValue = 0 } = {}) {
  return Object.freeze({
    defaultValue,
    fromAttribute(value) {
      if (value != null) {
        let parsedValue = parseDouble(value);
        if (parsedValue != null) {
          return parsedValue;
        }
      }
      return defaultValue;
    },
    coerceValue: coerceToDouble,
    setAttribute(elt, attribute, value) {
      elt.setAttribute(attribute, value);
    },
  });
}
/** @type {import("./index.d.ts").reflectPositiveDouble} */
export function reflectPositiveDouble({ defaultValue = 1 } = {}) {
  return Object.freeze({
    defaultValue,
    fromAttribute(value) {
      if (value != null) {
        let parsedValue = parseDouble(value);
        if (parsedValue != null && parsedValue > 0) {
          return parsedValue;
        }
      }
      return defaultValue;
    },
    coerceValue: coerceToDouble,
    setAttribute(elt, attribute, value) {
      if (value <= 0) {
        return;
      }
      elt.setAttribute(attribute, value);
    },
  });
}

/** @type {import("./index.d.ts").reflectElementReference<T>} */
export function reflectElementReference(element, type = Element) {
  /** @type {string | null} */
  let id = null;
  /** @type {WeakRef<Element> | null} */
  let explicitlySet = null;
  return Object.freeze({
    get() {
      let result = explicitlySet?.deref();
      if (result != null) {
        return isDescendantOfShadowIncludingAncestors(element, result)
          ? result
          : null;
      }
      if (id != null) {
        return findTypedById(element, id, type) ?? null;
      }
      return null;
    },
    fromAttribute(value) {
      explicitlySet = null;
      id = value;
    },
    coerceValue(value) {
      if (value != null) {
        return coerceToInterface(type, value);
      }
      return null;
    },
    setAttribute(attribute, value) {
      if (value == null) {
        explicitlySet = null;
        element.removeAttribute(attribute);
      } else {
        element.setAttribute(attribute, "");
        explicitlySet = new WeakRef(value);
      }
    },
  });
}

/** @type {import("./index.d.ts").reflectElementReferences<T>} */
export function reflectElementReferences(element, type = Element) {
  const coerceValue = (value) => coerceToInterface(type, value);
  /** @type {(readonly string[]) | null} */
  let ids = null;
  /** @type {(readonly WeakRef<T>[]) | null} */
  let explicitlySet = null;
  /** @type {(readonly T[]) | null} */
  let cached = null;

  return Object.freeze({
    get() {
      let elements;
      if (explicitlySet != null) {
        elements = explicitlySet
          .map((ref) => ref.deref())
          .filter(
            (elt) =>
              elt != null &&
              isDescendantOfShadowIncludingAncestors(element, elt),
          );
      } else {
        elements = ids
          ?.map((id) => findTypedById(element, id, type))
          .filter((e) => e != null);
      }
      if (elements == null) {
        cached = null;
      } else if (cached == null || !arrayContentEquals(cached, elements)) {
        cached = coerceToFrozenArray(coerceValue, elements);
      }
      return cached;
    },
    fromAttribute(value) {
      explicitlySet = null;
      ids = value != null ? splitOnASCIIWhitespace(value) : null;
    },
    coerceValue(value) {
      if (value != null) {
        return coerceToFrozenArray(coerceValue, value);
      }
      return null;
    },
    setAttribute(attribute, value) {
      if (value == null) {
        explicitlySet = null;
        element.removeAttribute(attribute);
      } else {
        element.setAttribute(attribute, "");
        explicitlySet = Array.from(value, (e) => new WeakRef(e));
      }
    },
  });
}

/**
 * Returns true if `attrElement` is a descendant of any of `element`'s shadow-including ancestors.
 *
 * @param {Element} element
 * @param {Element} attrElement
 */
function isDescendantOfShadowIncludingAncestors(element, attrElement) {
  for (
    let parent = element.getRootNode();
    parent != null;
    parent =
      // make sure we don't call .host on a custom element (in case of a detached tree)
      parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE
        ? parent.host?.getRootNode()
        : null
  ) {
    if (parent.contains(attrElement)) {
      return true;
    }
  }
  return false;
}

/**
 * @template {Element} T
 * @param {Element} element
 * @param {string} id
 * @param {{new(): T, prototype: T}} type
 * @returns {T | undefined}
 */
function findTypedById(element, id, type) {
  const candidates = /** @type {Element | Document | DocumentFragment} */ (
    element.getRootNode()
  ).querySelectorAll(`#${CSS.escape(id)}`);
  //return Array.prototype.find.apply(candidates, (e) => e instanceof type);
  return Array.from(candidates).find((e) => e instanceof type);
}

/**
 * @param {readonly Element[]} arr1
 * @param {readonly Element[]} arr2
 */
function arrayContentEquals(arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
}

/**
 * @param {string} str
 */
function splitOnASCIIWhitespace(str) {
  return str.replace(/^[ \t\n\f\r]+/).split(/[ \t\n\f\r]+/);
}

// TBC: tokenlist
