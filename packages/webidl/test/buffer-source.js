import assert from "node:assert";
import { describe, it } from 'node:test';
import vm from "node:vm";
import { MessageChannel } from "node:worker_threads";

// Copied from the webidl-conversions@7.0.0 NPM package

import assertThrows from "./helpers/assertThrows.js";
import {
  coerceToArrayBufferView,
  coerceToBufferSource,
  coerceToDataView,
  coerceToArrayBuffer,
  coerceToInt8Array,
  coerceToInt16Array,
  coerceToInt32Array,
  coerceToUint8Array,
  coerceToUint16Array,
  coerceToUint32Array,
  coerceToUint8ClampedArray,
  coerceToFloat32Array,
  coerceToFloat64Array,
} from "@webfeet/webidl";

const conversions = {
  "ArrayBufferView": coerceToArrayBufferView,
  "BufferSource": coerceToBufferSource,
  "DataView": coerceToDataView,
  "ArrayBuffer": coerceToArrayBuffer,
  "Int8Array": coerceToInt8Array,
  "Int16Array": coerceToInt16Array,
  "Int32Array": coerceToInt32Array,
  "Uint8Array": coerceToUint8Array,
  "Uint16Array": coerceToUint16Array,
  "Uint32Array": coerceToUint32Array,
  "Uint8ClampedArray": coerceToUint8ClampedArray,
  "Float32Array": coerceToFloat32Array,
  "Float64Array": coerceToFloat64Array
};

function commonNotOk(sut) {
  it("should throw a TypeError for `undefined`", () => {
    assertThrows(sut, [undefined], TypeError);
  });

  it("should throw a TypeError for `null`", () => {
    assertThrows(sut, [null], TypeError);
  });

  it("should throw a TypeError for `true`", () => {
    assertThrows(sut, [true], TypeError);
  });

  it("should throw a TypeError for `false`", () => {
    assertThrows(sut, [false], TypeError);
  });

  it("should throw a TypeError for `Infinity`", () => {
    assertThrows(sut, [Infinity], TypeError);
  });

  it("should throw a TypeError for `NaN`", () => {
    assertThrows(sut, [NaN], TypeError);
  });

  it("should throw a TypeError for `0`", () => {
    assertThrows(sut, [0], TypeError);
  });

  it("should throw a TypeError for `''`", () => {
    assertThrows(sut, [""], TypeError);
  });

  it("should throw a TypeError for `Symbol.iterator`", () => {
    assertThrows(sut, [Symbol.iterator], TypeError);
  });

  it("should throw a TypeError for `{}`", () => {
    assertThrows(sut, [{}], TypeError);
  });

  it("should throw a TypeError for `() => {}`", () => {
    assertThrows(sut, [() => {}], TypeError);
  });
}

function testOk(name, sut, create) {
  it(`should return input for ${name}`, () => {
    const obj = create();
    assert.strictEqual(sut(obj), obj);
  });
}

function testNotOk(name, sut, create) {
  it(`should throw a TypeError for ${name}`, () => {
    assertThrows(sut, [create()], TypeError);
  });
}

const differentRealm = vm.createContext();

const bufferSourceConstructors = [
  DataView,
  ArrayBuffer,
  Int8Array,
  Int16Array,
  Int32Array,
  Uint8Array,
  Uint16Array,
  Uint32Array,
  Uint8ClampedArray,
  Float32Array,
  Float64Array
];

const bufferSourceCreators = [
  {
    typeName: "ArrayBuffer",
    isShared: false,
    isDetached: false,
    label: "ArrayBuffer same realm",
    creator: () => new ArrayBuffer(0)
  },
  {
    typeName: "ArrayBuffer",
    isShared: false,
    isDetached: true,
    label: "detached ArrayBuffer",
    creator: () => {
      const value = new ArrayBuffer(0);
      const { port1 } = new MessageChannel();
      port1.postMessage(undefined, [value]);
      return value;
    }
  }
];

if (typeof SharedArrayBuffer === "function") {
  bufferSourceCreators.push({
    typeName: "SharedArrayBuffer",
    isShared: true,
    isDetached: false,
    label: "SharedArrayBuffer same realm",
    creator: () => new SharedArrayBuffer(0)
  });
}

for (const constructor of bufferSourceConstructors) {
  if (constructor === ArrayBuffer) {
    continue;
  }

  const { name } = constructor;
  bufferSourceCreators.push(
    {
      typeName: name,
      isShared: false,
      isDetached: false,
      isForged: false,
      label: `${name} same realm`,
      creator: () => new constructor(new ArrayBuffer(0))
    },
    {
      typeName: name,
      isShared: false,
      isDetached: false,
      isForged: false,
      label: `${name} different realm`,
      creator: () => vm.runInContext(`new ${constructor.name}(new ArrayBuffer(0))`, differentRealm)
    },
    {
      typeName: name,
      isShared: false,
      isDetached: false,
      isForged: true,
      label: `forged ${name}`,
      creator: () => Object.create(constructor.prototype, { [Symbol.toStringTag]: { value: name } })
    },
    {
      typeName: name,
      isShared: false,
      isDetached: true,
      isForged: false,
      label: `detached ${name}`,
      creator: () => {
        const value = new constructor(new ArrayBuffer(0));
        const { port1 } = new MessageChannel();
        port1.postMessage(undefined, [value.buffer]);
        return value;
      }
    }
  );

  if (typeof SharedArrayBuffer === "function") {
    bufferSourceCreators.push(
      {
        typeName: name,
        isShared: true,
        isDetached: false,
        isForged: false,
        label: `${name} SharedArrayBuffer same realm`,
        creator: () => new constructor(new SharedArrayBuffer(0))
      },
      {
        typeName: name,
        isShared: true,
        isDetached: false,
        isForged: false,
        label: `${name} SharedArrayBuffer different realm`,
        creator: () => vm.runInContext(`new ${constructor.name}(new SharedArrayBuffer(0))`, differentRealm)
      }
    );
  }
}

for (const type of bufferSourceConstructors) {
  const typeName = type.name;
  const sut = conversions[typeName];

  describe(`WebIDL ${typeName} type`, { skip: 'unimplemented' }, () => {
    for (const innerType of bufferSourceCreators) {
      const testFunction =
        innerType.typeName === typeName &&
        !innerType.isShared &&
        !innerType.isDetached &&
        !innerType.isForged ?
          testOk :
          testNotOk;

      testFunction(innerType.label, sut, innerType.creator);
    }

    commonNotOk(sut);

    describe("with [AllowShared]", () => {
      const allowSharedSUT = (v, opts) => conversions[typeName](v, { ...opts, allowShared: true });

      for (const { label, creator, typeName: innerTypeName, isDetached, isForged } of bufferSourceCreators) {
        const testFunction = innerTypeName === typeName && !isDetached && !isForged ? testOk : testNotOk;
        testFunction(label, allowSharedSUT, creator);
      }

      commonNotOk(allowSharedSUT);
    });
  });
}

describe("WebIDL ArrayBufferView type", { skip: 'unimplemented' }, () => {
  const sut = conversions.ArrayBufferView;

  for (const { label, typeName, isShared, isDetached, isForged, creator } of bufferSourceCreators) {
    const testFunction =
      typeName !== "ArrayBuffer" &&
      typeName !== "SharedArrayBuffer" &&
      !isShared &&
      !isDetached &&
      !isForged ?
        testOk :
        testNotOk;

    testFunction(label, sut, creator);
  }

  commonNotOk(sut);

  describe("with [AllowShared]", () => {
    const allowSharedSUT = (v, opts) => conversions.ArrayBufferView(v, { ...opts, allowShared: true });

    for (const { label, creator, typeName, isDetached, isForged } of bufferSourceCreators) {
      const testFunction =
        typeName !== "ArrayBuffer" &&
        typeName !== "SharedArrayBuffer" &&
        !isDetached &&
        !isForged ?
          testOk :
          testNotOk;

      testFunction(label, allowSharedSUT, creator);
    }

    commonNotOk(allowSharedSUT);
  });
});

describe("WebIDL BufferSource type", { skip: 'unimplemented' }, () => {
  const sut = conversions.BufferSource;

  for (const { label, creator, isShared, isDetached, isForged } of bufferSourceCreators) {
    const testFunction = !isShared && !isDetached && !isForged ? testOk : testNotOk;
    testFunction(label, sut, creator);
  }

  commonNotOk(sut);

  describe("with [AllowShared]", () => {
    const allowSharedSUT = (v, opts) => conversions.BufferSource(v, { ...opts, allowShared: true });

    for (const { label, creator, isDetached, isForged } of bufferSourceCreators) {
      const testFunction = !isDetached && !isForged ? testOk : testNotOk;
      testFunction(label, allowSharedSUT, creator);
    }

    commonNotOk(allowSharedSUT);
  });
});
