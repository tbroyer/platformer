export function getObservedAttributes(
  cls: CustomElementConstructor,
): readonly string[];

export function reflectAttributeToProperty(
  elt: HTMLElement,
  name: string,
  oldValue: string | null,
  newValue: string | null,
): void;

export class BaseElement extends HTMLElement {
  static readonly observedAttributes: readonly string[];

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ): void;
}

export type AttributeChangedCallback = (
  this: HTMLElement,
  oldValue: string | null,
  newValue: string | null,
) => void;

export function addAttribute(
  metadata: DecoratorMetadata,
  name: string,
  changed: AttributeChangedCallback,
): void;
