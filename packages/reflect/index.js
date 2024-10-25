import {
  coerceToDOMString,
  coerceToUSVString,
  coerceToBoolean,
  coerceToLong,
  coerceToUnsignedLong,
  coerceToDouble,
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

// TBC: tokenlist, element, frozen array of elements
