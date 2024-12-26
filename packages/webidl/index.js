export function coerceToAny(value) {
  switch (typeof value) {
    case "undefined":
    case "object": // matches null and object
    case "boolean":
    case "function":
      return value;
    case "number":
      return coerceToUnrestrictedDouble(value);
    case "bigint":
      return coerceToBigInt(value);
    case "string":
      return coerceToDOMString(value);
    case "symbol":
      return coerceToSymbol(value);
  }
}

// eslint-disable-next-line no-unused-vars
export function coerceToUndefined(value) {
  return undefined;
}

export function coerceToBoolean(value) {
  return Boolean(value);
}

function toNumber(value) {
  // Use unary plus rather than Number() as it throws with bigint values
  return +value;
}

function unsignedModulo(value, bitsTo32) {
  return (toNumber(value) << bitsTo32) >>> bitsTo32;
}
function signedModulo(value, bitsTo32) {
  return (toNumber(value) << bitsTo32) >> bitsTo32;
}
function clamp(value, min, max) {
  value = toNumber(value);
  if (Number.isNaN(value)) {
    return 0;
  }
  value = Math.max(min, Math.min(value, max));
  // Add 0 to turn -0 to +0
  return Math.round(value) + 0;
}
function enforce(value, min, max) {
  value = toNumber(value);
  if (!Number.isFinite(value)) {
    throw new TypeError();
  }
  // Add 0 to turn -0 to +0
  value = Math.trunc(value) + 0;
  if (value < min || max < value) {
    throw new TypeError();
  }
  return value;
}

const MIN_BYTE = -128;
const MAX_BYTE = 127;
export function coerceToByte(value) {
  return signedModulo(value, 24);
}
export function coerceToClampedByte(value) {
  return clamp(value, MIN_BYTE, MAX_BYTE);
}
export function coerceToEnforcedByte(value) {
  return enforce(value, MIN_BYTE, MAX_BYTE);
}

const MIN_OCTET = 0;
const MAX_OCTET = 255;
export function coerceToOctet(value) {
  return unsignedModulo(value, 24);
}
export function coerceToClampedOctet(value) {
  return clamp(value, MIN_OCTET, MAX_OCTET);
}
export function coerceToEnforcedOctet(value) {
  return enforce(value, MIN_OCTET, MAX_OCTET);
}

const MIN_SHORT = -32768;
const MAX_SHORT = 32767;
export function coerceToShort(value) {
  return signedModulo(value, 16);
}
export function coerceToClampedShort(value) {
  return clamp(value, MIN_SHORT, MAX_SHORT);
}
export function coerceToEnforcedShort(value) {
  return enforce(value, MIN_SHORT, MAX_SHORT);
}

const MIN_UNSIGNED_SHORT = 0;
const MAX_UNSIGNED_SHORT = 65535;
export function coerceToUnsignedShort(value) {
  return unsignedModulo(value, 16);
}
export function coerceToClampedUnsignedShort(value) {
  return clamp(value, MIN_UNSIGNED_SHORT, MAX_UNSIGNED_SHORT);
}
export function coerceToEnforcedUnsignedShort(value) {
  return enforce(value, MIN_UNSIGNED_SHORT, MAX_UNSIGNED_SHORT);
}

const MIN_LONG = -2147483648;
const MAX_LONG = 2147483647;
export function coerceToLong(value) {
  // Avoid the '<< 0' of signedModulo
  return toNumber(value) >> 0;
}
export function coerceToClampedLong(value) {
  return clamp(value, MIN_LONG, MAX_LONG);
}
export function coerceToEnforcedLong(value) {
  return enforce(value, MIN_LONG, MAX_LONG);
}

const MIN_UNSIGNED_LONG = 0;
const MAX_UNSIGNED_LONG = 4294967295;
export function coerceToUnsignedLong(value) {
  // Avoid the '<< 0' of unsignedModulo
  return toNumber(value) >>> 0;
}
export function coerceToClampedUnsignedLong(value) {
  return clamp(value, MIN_UNSIGNED_LONG, MAX_UNSIGNED_LONG);
}
export function coerceToEnforcedUnsignedLong(value) {
  return enforce(value, MIN_UNSIGNED_LONG, MAX_UNSIGNED_LONG);
}

export function coerceToLongLong(value) {
  value = toNumber(value);
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Number(BigInt.asIntN(64, BigInt(Math.trunc(value))));
}
export function coerceToClampedLongLong(value) {
  return clamp(value, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
}
export function coerceToEnforcedLongLong(value) {
  return enforce(value, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
}

export function coerceToUnsignedLongLong(value) {
  value = toNumber(value);
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Number(BigInt.asUintN(64, BigInt(Math.trunc(value))));
}
export function coerceToClampedUnsignedLongLong(value) {
  return clamp(value, 0, Number.MAX_SAFE_INTEGER);
}
export function coerceToEnforcedUnsignedLongLong(value) {
  return enforce(value, 0, Number.MAX_SAFE_INTEGER);
}

export function coerceToFloat(value) {
  value = coerceToUnrestrictedFloat(value);
  if (!Number.isFinite(value)) {
    throw new TypeError();
  }
  return value;
}
export function coerceToUnrestrictedFloat(value) {
  return Math.fround(toNumber(value));
}

export function coerceToDouble(value) {
  value = toNumber(value);
  if (!Number.isFinite(value)) {
    throw new TypeError();
  }
  return value;
}
export function coerceToUnrestrictedDouble(value) {
  return toNumber(value);
}

function isObject(value) {
  return (
    value != null && (typeof value === "object" || typeof value === "function")
  );
}

function toPrimitive(value) {
  if (isObject(value)) {
    const prim = value[Symbol.toPrimitive];
    if (prim != null) {
      value = prim.call(value, "number");
      if (isObject(value)) {
        throw new TypeError();
      }
      return value;
    }
    // OrdinaryToPrimitive
    if (typeof value.valueOf === "function") {
      const result = value.valueOf();
      if (!isObject(result)) {
        return result;
      }
      // fall-through
    }
    if (typeof value.toString === "function") {
      value = value.toString();
      if (!isObject(value)) {
        return value;
      }
      // fall-through
    }
    throw new TypeError();
  }
  return value;
}
export function coerceToBigInt(value) {
  value = toPrimitive(value);
  switch (typeof value) {
    case "boolean":
      return value ? 1n : 0n;
    case "bigint":
      return value;
    case "string":
      return BigInt(value);
    case "undefined":
    case "object": // null value
    case "number":
    case "symbol":
    default:
      throw new TypeError();
  }
}

export function coerceToDOMString(value) {
  // Use string template rather than String() to throw for symbols
  return `${value}`;
}
export function coerceToByteString(value) {
  value = coerceToDOMString(value);
  // eslint-disable-next-line no-control-regex
  if (/[^\x00-\xff]/.test(value)) {
    throw new TypeError();
  }
  return value;
}
export function coerceToUSVString(value) {
  return coerceToDOMString(value).toWellFormed();
}

export function coerceToObject(value) {
  if (value == null || !isObject(value)) {
    throw new TypeError();
  }
  return value;
}

export function coerceToSymbol(value) {
  if (typeof value !== "symbol") {
    throw new TypeError();
  }
  return value;
}

export function coerceToInterface(iface, value) {
  if (value instanceof iface) {
    return value;
  }
  throw new TypeError();
}

// Callback interface types, dictionary types, unions

export function coerceToEnumeration(allowedValues, value) {
  value = coerceToDOMString(value);
  if (!allowedValues.includes(value)) {
    throw new TypeError();
  }
  return value;
}

export function coerceToCallbackFunction(value) {
  if (typeof value !== "function") {
    throw new TypeError();
  }
  return value;
}

export function coerceToLegacyCallbackFunction(value) {
  if (!isObject(value)) {
    return null;
  }
  return value;
}

export function coerceToSequence(coerceValue = coerceToAny, value) {
  if (!isObject(value)) {
    throw new TypeError();
  }
  const method = value[Symbol.iterator];
  if (method == undefined || typeof method !== "function") {
    throw new TypeError();
  }
  return Array.from(value, (v) => coerceValue(v));
}

export function coerceToRecord(
  coerceKey = coerceToDOMString,
  coerceValue = coerceToAny,
  value,
) {
  if (!isObject(value)) {
    throw new TypeError();
  }
  const result = {};
  for (const k of Object.getOwnPropertyNames(value)) {
    if (Object.getOwnPropertyDescriptor(value, k)?.enumerable) {
      result[coerceKey(k)] = coerceValue(value[k]);
    }
  }
  return result;
}

export function coerceToPromise(value) {
  return Promise.resolve(value);
}

export function coerceToFrozenArray(coerceValue = coerceToAny, value) {
  return Object.freeze(coerceToSequence(coerceValue, value));
}

// eslint-disable-next-line no-unused-vars
export function coerceToInt8Array(value) {
  throw new Error("unimplemented");
}
// eslint-disable-next-line no-unused-vars
export function coerceToInt16Array(value) {
  throw new Error("unimplemented");
}
// eslint-disable-next-line no-unused-vars
export function coerceToInt32Array(value) {
  throw new Error("unimplemented");
}
// eslint-disable-next-line no-unused-vars
export function coerceToUint8Array(value) {
  throw new Error("unimplemented");
}
// eslint-disable-next-line no-unused-vars
export function coerceToUint8ClampedArray(value) {
  throw new Error("unimplemented");
}
// eslint-disable-next-line no-unused-vars
export function coerceToUint16Array(value) {
  throw new Error("unimplemented");
}
// eslint-disable-next-line no-unused-vars
export function coerceToUint32Array(value) {
  throw new Error("unimplemented");
}
// eslint-disable-next-line no-unused-vars
export function coerceToFloat32Array(value) {
  throw new Error("unimplemented");
}
// eslint-disable-next-line no-unused-vars
export function coerceToFloat64Array(value) {
  throw new Error("unimplemented");
}
// eslint-disable-next-line no-unused-vars
export function coerceToArrayBuffer(value) {
  throw new Error("unimplemented");
}
// eslint-disable-next-line no-unused-vars
export function coerceToArrayBufferView(value) {
  throw new Error("unimplemented");
}
// eslint-disable-next-line no-unused-vars
export function coerceToBufferSource(value) {
  throw new Error("unimplemented");
}
// eslint-disable-next-line no-unused-vars
export function coerceToDataView(value) {
  throw new Error("unimplemented");
}
