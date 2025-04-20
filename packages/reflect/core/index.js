import {
  coerceToDOMString,
  coerceToUSVString,
  coerceToBoolean,
  coerceToLong,
  coerceToUnsignedLong,
  coerceToDouble,
  coerceToInterface,
  coerceToFrozenArray,
  coerceVariadic,
  coerceOptional,
  isArrayIndex,
} from "@webfeet/webidl";
import {
  enumerated,
  parseInteger,
  parseNonNegativeInteger,
  parseDouble,
} from "@webfeet/microsyntaxes";

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
  const arr = str.replace(/^[ \t\n\f\r]+/, "").split(/[ \t\n\f\r]+/);
  if (arr.at(-1) === "") {
    arr.length--;
  }
  return arr;
}

// Can't use private fields with proxies
// https://lea.verou.me/blog/2023/04/private-fields-considered-harmful/
const ELEMENT = Symbol();
const ATTRIBUTE = Symbol();
const SUPPORTED_TOKENS = Symbol();
const TOKENS = Symbol();

function DOMTokenList_update(domTokenList) {
  if (
    domTokenList[TOKENS].length == 0 &&
    !domTokenList[ELEMENT].hasAttribute(domTokenList[ATTRIBUTE])
  ) {
    return;
  }
  domTokenList[ELEMENT].setAttribute(
    domTokenList[ATTRIBUTE],
    domTokenList[TOKENS].join(" "),
  );
}
function DOMTokenList_fromAttribute(domTokenList, value) {
  domTokenList[TOKENS] = value == null ? [] : parseTokenSet(value);
}

class DOMTokenList {
  constructor(element, attribute, supportedTokens) {
    this[ELEMENT] = element;
    this[ATTRIBUTE] = attribute;
    this[SUPPORTED_TOKENS] = supportedTokens;
    DOMTokenList_fromAttribute(this, element.getAttribute(attribute));
    return new Proxy(this, domTokenListProxyHandler);
  }
  get length() {
    return this[TOKENS].length;
  }
  item(index) {
    return this[TOKENS][coerceToUnsignedLong(index)] ?? null;
  }
  contains(token) {
    token = coerceToDOMString(token);
    return this[TOKENS].includes(token);
  }
  add(...tokens) {
    tokens = coerceVariadic(coerceToDOMString, tokens);
    if (tokens.includes("")) {
      throw new DOMException(undefined, "SyntaxError");
    }
    if (tokens.some(containsASCIIWhitespace)) {
      throw new DOMException(undefined, "InvalidCharacterError");
    }
    this[TOKENS] = [...new Set([...this[TOKENS], ...tokens])];
    DOMTokenList_update(this);
  }
  remove(...tokens) {
    tokens = coerceVariadic(coerceToDOMString, tokens);
    if (tokens.includes("")) {
      throw new DOMException(undefined, "SyntaxError");
    }
    if (tokens.some(containsASCIIWhitespace)) {
      throw new DOMException(undefined, "InvalidCharacterError");
    }
    this[TOKENS] = this[TOKENS].filter((token) => !tokens.includes(token));
    DOMTokenList_update(this);
  }
  toggle(token, force) {
    token = coerceToDOMString(token);
    force = coerceOptional(coerceToBoolean, force);
    if (token === "") {
      throw new DOMException(undefined, "SyntaxError");
    }
    if (containsASCIIWhitespace(token)) {
      throw new DOMException(undefined, "InvalidCharacterError");
    }
    const tokenIndex = this[TOKENS].indexOf(token);
    if (tokenIndex >= 0) {
      if (force === undefined || force === false) {
        this[TOKENS].splice(tokenIndex, 1);
        DOMTokenList_update(this);
        return false;
      }
      return true;
    }
    if (force === undefined || force === true) {
      this[TOKENS].push(token);
      DOMTokenList_update(this);
      return true;
    }
    return false;
  }
  replace(token, newToken) {
    token = coerceToDOMString(token);
    newToken = coerceToDOMString(newToken);
    if (token === "" || newToken === "") {
      throw new DOMException(undefined, "SyntaxError");
    }
    if (containsASCIIWhitespace(token) || containsASCIIWhitespace(newToken)) {
      throw new DOMException(undefined, "InvalidCharacterError");
    }
    const tokenIndex = this[TOKENS].indexOf(token);
    if (tokenIndex < 0) {
      return false;
    }
    if (!replaceInSet(this[TOKENS], token, newToken)) {
      return false;
    }
    DOMTokenList_update(this);
    return true;
  }
  supports(token) {
    return this[SUPPORTED_TOKENS].includes(toASCIILowerCase(token));
  }
  get value() {
    return this[ELEMENT].getAttribute(this[ATTRIBUTE]) ?? "";
  }
  set value(value) {
    this[ELEMENT].setAttribute(this[ATTRIBUTE], value);
  }
  toString() {
    return this.value;
  }
  get [Symbol.toStringTag]() {
    return "DOMTokenList ";
  }
}
// https://webidl.spec.whatwg.org/#js-iterable
Object.defineProperties(DOMTokenList.prototype, {
  [Symbol.iterator]: {
    value: Array.prototype.values,
    writable: true,
    enumerable: false,
    configurable: true,
  },
  entries: {
    value: Array.prototype.entries,
    writable: true,
    enumerable: true,
    configurable: true,
  },
  keys: {
    value: Array.prototype.keys,
    writable: true,
    enumerable: true,
    configurable: true,
  },
  values: {
    value: Array.prototype.values,
    writable: true,
    enumerable: true,
    configurable: true,
  },
  forEach: {
    value: Array.prototype.forEach,
    writable: true,
    enumerable: true,
    configurable: true,
  },
});

/** @type {ProxyHandler<DOMTokenList>} */
const domTokenListProxyHandler = {
  get(target, property, receiver) {
    let index = isArrayIndex(property);
    if (index !== false && index >= 0 && index < target.length) {
      return target.item(index);
    }
    return Reflect.get(target, property, receiver);
  },
  getOwnPropertyDescriptor(target, property) {
    let index = isArrayIndex(property);
    if (index !== false && index >= 0 && index < target.length) {
      return {
        value: target.item(index),
        writable: false,
        configurable: true,
        enumerable: true,
      };
    }
    return Reflect.getOwnPropertyDescriptor(target, property);
  },
  deleteProperty(target, property) {
    let index = isArrayIndex(target, property);
    if (index !== false) {
      return index < 0 || index >= target.length;
    }
    return Reflect.deleteProperty(target, property);
  },
  has(target, property) {
    let index = isArrayIndex(target, property);
    if (index !== false && index >= 0 && index < target.length) {
      return true;
    }
    return Reflect.has(target, property);
  },
  ownKeys(target) {
    return [...target.keys().map(String), ...Reflect.ownKeys(target)];
  },
};

/** @type {import("./index.d.ts").reflectDOMTokenList} */
export function reflectDOMTokenList(element, attribute, supportedTokens) {
  const domTokenList = new DOMTokenList(element, attribute, supportedTokens);
  return Object.freeze({
    get value() {
      return domTokenList;
    },
    set value(value) {
      domTokenList.value = value;
    },
    fromAttribute(value) {
      DOMTokenList_fromAttribute(domTokenList, value);
    },
    coerceValue: coerceToDOMString,
  });
}

/**
 * Implement the [ASCII lowercase](https://infra.spec.whatwg.org/#ascii-lowercase) transformation
 * to help implement [ASCII case-insensitive match](https://infra.spec.whatwg.org/#ascii-case-insensitive).
 *
 * @param {string} value
 * @returns {string}
 */
// XXX: move to an 'infra' package?
function toASCIILowerCase(value) {
  return value.replace(/[A-Z]/g, (u) => u.toLowerCase());
}

/**
 * Implement the [ordered set parser](https://dom.spec.whatwg.org/#concept-ordered-set-parser).
 *
 * @param {string} value
 * @returns {string[]}
 */
function parseTokenSet(value) {
  return [...new Set(splitOnASCIIWhitespace(value))];
}

function containsASCIIWhitespace(value) {
  return /[ \t\n\f\r]/.test(value);
}

/**
 * Implements the [replace](https://infra.spec.whatwg.org/#set-replace) operation on a set.
 *
 * @template T
 * @param {T[]} set
 * @param {T} item
 * @param {T} replacement
 * @returns whether the set was modified
 */
function replaceInSet(set, item, replacement) {
  const itemIndex = set.indexOf(item);
  const replacementIndex = set.indexOf(replacement);
  if (itemIndex < 0) {
    // nothing to replace
    return false;
  }
  // if (replacementIndex < 0) {
  //   // only contains `item`
  //   set[itemIndex] = replacement;
  // } else {
  //   set[Math.min(itemIndex, replacementIndex)] = replacement;
  //   set.splice(Math.max(itemIndex, replacementIndex), 1);
  // }
  if (itemIndex < replacementIndex) {
    // both present, `item` comes first
    set[itemIndex] = replacement;
    set.splice(replacementIndex, 1);
  } else if (replacementIndex < 0) {
    // only contains `item`
    set[itemIndex] = replacement;
  } else if (itemIndex !== replacementIndex) {
    // both present, `replacement` comes first
    set.splice(itemIndex, 1);
  }
  return true;
}
