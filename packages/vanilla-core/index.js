// polyfill Symbol.metadata
Symbol.metadata ??= Symbol("metadata");

const ATTRIBUTES = Symbol();

/**
 * @type {import("./index.js").getObservedAttributes}
 */
export function getObservedAttributes(cls) {
  return Object.keys(cls[Symbol.metadata]?.[ATTRIBUTES] ?? {});
}

/**
 * @type {import("./index.js").reflectAttributeToProperty}
 */
export function reflectAttributeToProperty(elt, name, oldValue, newValue) {
  const mapper = elt.constructor[Symbol.metadata]?.[ATTRIBUTES]?.[name];
  mapper?.call(elt, oldValue, newValue);
}

/**
 * @type {import("./index.js").BaseElement}
 */
export class BaseElement extends HTMLElement {
  static get observedAttributes() {
    return getObservedAttributes(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    reflectAttributeToProperty(this, name, oldValue, newValue);
  }
}

/**
 * @type {import("./index.js").addAttribute}
 */
export function addAttribute(metadata, name, changed) {
  // Make a copy to make sure we're not modifying metadata
  // inherited from a super class
  metadata[ATTRIBUTES] = {
    ...(metadata[ATTRIBUTES] ?? {}),
    [name]: changed,
  };
}
