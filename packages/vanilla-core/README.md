# @platformer/vanilla-core

This package exports a few helpers to observe custom element attributes from decorators.

Decorators will declare attributes their need to observe, and users of those decorators will have to actually observe those attributes and defer handling to the decorators somehow.

## Usage for decorator authors

Decorator authors that need to observe an attribute need to call `addAttribute()` from their decorators.
Users of those decorators will have to follow a couple constraints on their custom elements, detailed below.

- `addAttribute(classMetadata, attributeName, changedCallback)` adds an attribute to observe with a callback function that'll be invoked whenever the attribute changes.
  The first argument is expected to be the decorator's `context.metadata`.
  The callback will be called with two arguments: the old and new attribute value, with `this` being the custom element (so make sure you pass a `function` and not an arrow-function).

## Usage for decorator users

Decorators built using `addAttribute()` above impose a couple constraints to their users, to actually observe the needed attributes.

- `getObservedAttributes(customElement)` returns the observed attributes added to the custom element's class metadata with `addAttribute()`; call this method to build the custom element's `observedAttributes` static property.

- `reflectAttributeToProperty(element, attributeName, oldValue, newValue)` defers handling of the attribute change to the decorator that registered to observe it; call this method from the `attributeChangeCallback()`

```js
import {
  getObservedAttributes,
  reflectAttributeToProperty,
} from "@platformer/vanilla-core";

class MyElement extends HTMLElement {
  static get observedAttributes() {
    return getObservedAttributes(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    reflectAttributeToProperty(this, name, oldValue, newValue);
  }
}
```

The `BaseElement` class can be used as base class in place of `HTMLElement` to inherit default implementations of these.
This is particularly handy when your element doesn't need to observe attributes on its own.

```js
class MyElement extends BaseElement {}
```
