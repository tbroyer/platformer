# @platformer/event-handler

This package provides helpers to implement an [event handler](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-attributes) on a custom element.
Event handlers are those `onxxx` attributes and properties that allow listening to a `xxx` event, like `onload` or `onclick`.

## API

This package exports an `EventHandlerHelper` class, as well as an `@eventHandler()` decorator.

### Helper class

The exported `EventHandlerHelper` class has:

- a constructor taking as argument the event's target (the custom element), and the event name (e.g. `foo` for an `onfoo` event handler)

- a `fromAttribute` method that takes a string or `null` value as its single argument, coming directly from an HTML attribute, and implements the _attribute change steps_ for an _event handler content attribute_; it's thus expected to be called from `attributeChangedCallback`

- a `get` method without argument that implements the _getter_ steps, and thus returns an object (generally a function) or `null`

- a `set` method that takes an event handler callback or `null` as its single argument, and implements the _setter_ steps

> [!IMPORTANT]
> Because event handler attributes are evaluated dynamically by the custom element, they'll report to a `script-src` content security policy, not `script-src-attr` like native event handlers.
> Also, because they need to be evaluated within specific contexts, the script that will actually be evaluated won't directly be the event handler attribute's value;
> this means a content security policy won't be able to use `'unsafe-hashes'` with hash sources, unless hashes are computed for the actually evaluated script (which will be dependent on the version of this package);
> in other words `'unsafe-inline'` will be the easiest to setup, but also the least secure.
> This only applies to event handler attributes though, not event handler properties.

#### Usage

Assuming an `onfoo` event handler for a `foo` event:

```js
class MyElement extends HTMLElement {
  #onfoo = new EventHandlerHelper("foo", this);

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

### Decorator

The exported `@eventHandler()` decorator can be applied to an auto-accessor property or to a setter (whose names must start with `on`) to turn it into an event handler property (_without_ support for an event handler attribute).

The event name to be listened to is derived from the annotated property name (stripping the mandatory `on` prefix and turning it to lower-case). In case that rule doesn't fit your needs, the decorator factory can be called with an object with a `type` property to explicitly set the event name.

#### Usage

```js
class MyObject extends EventTarget {
  @eventHandler()
  accessor onfoo;

  // Listens to "bar-baz" events
  @eventHandler({ type: "bar-baz" })
  accessor onbarBaz;

  #onqux;
  get onqux() {
    returh this.#onqux;
  }
  @eventHandler()
  set onqux(value) {
    // At this point, the value has been validated, and the event listener setup if needed.
    // Now you can do other things whenever the event handler is set.
    this.#onqux = value;
  }
}
```
