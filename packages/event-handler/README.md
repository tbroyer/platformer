# @platformer/event-handler

This package provides a helper class to implement an [HTML event handler](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-attributes) on a custom element.
HTML event handlers are those `onxxx` attributes and properties that allow listening to a `xxx` event, like `onload` or `onclick`.

> [!IMPORTANT]
> Because event handler attributes are evaluated dynamically by the custom element, they'll report to a `script-src` content security policy, not `script-src-attr` like native event handlers.
> Also, because they need to be evaluated within specific contexts, the script that will actually be evaluated won't directly be the event handler attribute's value;
> this means a content security policy won't be able to use `'unsafe-hashes'` with hash sources, unless hashes are computed for the actually evaluated script (which will be dependent on the version of this package);
> in other words `'unsafe-inline'` will be the easiest to setup, but also the least secure.
> This only applies to event handler attributes though, not event handler properties.

## API

The exported `EventHandlerHelper` class has:

- a constructor taking as argument the event's target (the custom element), and the event name (e.g. `foo` for an `onfoo` event handler)

- a `fromAttribute` method that takes a string or `null` value as its single argument, coming directly from an HTML attribute, and implements the _attribute change steps_ for an _event handler content attribute_; it's thus expected to be called from `attributeChangedCallback`

- a `get` method without argument that implements the _getter_ steps, and thus returns an object (generally a function) or `null`

- a `set` method that takes an event handler callback or `null` as its single argument, and implements the _setter_ steps

### Usage

Assuming an `onfoo` event handler for a `foo` event:

```js
class MyElement extends HTMLElement {
  #onfoo = new EventHandler("foo", this);

  static observedAttributes = ["onfoo"];

  attributeChangedCallback(name, oldValue, newValue) {
    // in this case, we know 'name' is necessarily 'onfoo' so we can skip any check
    this.#onfoo.fromAttribute(newValue);
  }
  get onfoo() {
    return this.#onfoo.get();
  }
  set onfoo(value) {
    this.#onfoo.set(value);
  }
}
```
