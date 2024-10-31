// polyfill Symbol.metadata
Symbol.metadata ??= Symbol("metadata");

const ATTRIBUTES = Symbol();

/**
 * @param {CustomElementConstructor} cls
 * @returns {string[]}
 */
export function getObservedAttributes(cls) {
  return Object.keys(cls[Symbol.metadata]?.[ATTRIBUTES] ?? {});
}

/**
 * @param {HTMLElement} elt
 * @param {string} name
 * @param {string | null} oldValue
 * @param {string | null} newValue
 */
export function reflectAttributeToProperty(elt, name, oldValue, newValue) {
  const mapper = elt.constructor[Symbol.metadata]?.[ATTRIBUTES]?.[name];
  mapper?.call(elt, oldValue, newValue);
}

export class BaseElement extends HTMLElement {
  /**
   * @returns {string[]}
   */
  static get observedAttributes() {
    return getObservedAttributes(this);
  }

  /**
   * @param {string} name
   * @param {string | null} oldValue
   * @param {string | null} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    reflectAttributeToProperty(this, name, oldValue, newValue);
  }
}

/**
 * @param {DecoratorMetadata} metadata
 * @param {string} name
 * @param {(this: HTMLElement, oldValue: string | null, newValue: string | null) => void} changed
 */
export function addAttribute(metadata, name, changed) {
  // Make a copy to make sure we're not modifying metadata
  // inherited from a super class
  metadata[ATTRIBUTES] = {
    ...(metadata[ATTRIBUTES] ?? {}),
    [name]: changed,
  };
}
