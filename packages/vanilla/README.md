# @platformer/vanilla

This implementation serves as a reference implementation of decorators following the [_@platformer/types_](../types/README.md) API.

## Reflection

It actually comes with 2 distinct implementations:

- a _direct_ implementation (exposed as `@platformer/vanilla`) following the HTML specification:
  the property getter directly reads the attribute value and parses it.

  ```js
  class MyElemet extends HTMLElement {
    @reflectXxx({ ...options }) accessor attr;
  }
  ```

- a _cached_ implementation (exposed as `@platformer/vanilla/cached.js`):
  the attribute is observed and the value is parsed in `attributeChangedCallback` and cached in a private field,
  the property getter can then directly return that private field.

  To integrate with `attributeChangedCallback`, the decorators store metadata on the element's class.
  The functions `getObservedAttributes(elementClass)` and `reflectAttributeToProperty(element, attributeName, oldValue, newValue)`
  can be called to implement the `static observedAttributes` property and `attributeChangedCallback` respectively.

  ```js
  class MyElement extends HTMLElement {
    static get observedAttributes() {
      return getObservedAttributes(this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      reflectAttributeToProperty(this, name, oldValue, newValue);
    }

    @reflectXxx({ ...options }) accessor attr;
  }
  ```

  The `BaseElement` class can be used as base class in place of `HTMLElement` to inherit default implementations of these.

  ```js
  class MyElement extends BaseElement {
    @reflectXxx({ ...options }) accessor attr;
  }
  ```

## Event handler

The `@eventHandler()` decorator is exposed from `@platformer/vanilla/event-handler.js`.

To integrate with `attributeChangedCallback`, the decorator store metadata on the element's class.
The functions `getObservedAttributes(elementClass)` and `reflectAttributeToProperty(element, attributeName, oldValue, newValue)`
can be called to implement the `static observedAttributes` property and `attributeChangedCallback` respectively.

```js
class MyElement extends HTMLElement {
  static get observedAttributes() {
    return getObservedAttributes(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    reflectAttributeToProperty(this, name, oldValue, newValue);
  }

  @eventHandler() accessor onfoo;
}
```

The `BaseElement` class can be used as base class in place of `HTMLElement` to inherit default implementations of these.

```js
class MyElement extends BaseElement {
  @eventHandler() accessor onfoo;
}
```

## Observed attributes

This is the implementation (exposed as `@platformer/vanilla/observed-attributes.js`) that both the _cached_ reflection implementation and the event handler decorator rely on.
They directly re-export its `getObservedAttributes` and `reflectAttributeToProperty` functions, and `BaseElement` class.

An `addAttribute(metadata, attributeName, attributeChanged)` function is also exported to register observed attributes from decorators.
The `metadata` argument is a `DecoratorMetadata` object (the `context.metadata` from a decorator, which should directly map to a class' metadata), and `attributeChanged` is a callback taking two arguments (the old and new attribute values) that will be called by `reflectAttributeToProperty` for that attribute.
