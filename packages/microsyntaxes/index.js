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

/** @type {import("./index.d.ts").enumerated} */
export function enumerated({ keywords, aliases, missing, invalid }) {
  const mapping = new Map();
  for (let keyword of keywords) {
    mapping.set(toASCIILowerCase(keyword), keyword);
  }
  if (aliases != null) {
    for (let [alias, keyword] of Object.entries(aliases)) {
      alias = toASCIILowerCase(alias);
      if (mapping.has(alias)) {
        throw new Error("Alias is a known keyword: " + alias);
      }
      if (!keywords.includes(keyword)) {
        throw new Error("Alias of an unknown keyword: " + keyword);
      }
      mapping.set(alias, keyword);
    }
  }
  if (missing != null && !keywords.includes(missing)) {
    throw new Error("Missing value default is not a known keyword");
  }
  if (invalid != null && !keywords.includes(invalid)) {
    throw new Error("Invalid value default is not a known keyword");
  }

  return function (value) {
    if (value == null) {
      return missing;
    }
    return mapping.get(toASCIILowerCase(value)) ?? invalid;
  };
}

/** @type {import("./index.d.ts").parseInteger} */
export function parseInteger(value) {
  const result = /^[ \t\n\f\r]*([+-]?[0-9]+)/.exec(value);
  if (result) {
    const resultInt = parseInt(result[1], 10);
    // Adding 0 has the side-effect of converting -0 to 0
    return resultInt + 0;
  }
  return null;
}

/** @type {import("./index.d.ts").parseNonNegativeInteger} */
export function parseNonNegativeInteger(value) {
  const result = parseInteger(value);
  if (result < 0) {
    return null;
  }
  return result;
}

/** @type {import("./index.d.ts").parseDouble} */
export function parseDouble(value) {
  // XXX: this matches possibly longer than just the floating point number
  // (e.g. 1.2.3, or 1+2, or 1e2e3), but then parseFloat will ignore the trailing junk.
  const result = /^[ \t\n\f\r]*([0-9.eE+-]+)/.exec(value);
  if (result) {
    const resultFloat = parseFloat(result[1]);
    if (Number.isFinite(resultFloat)) {
      return resultFloat;
    }
  }
  return null;
}
