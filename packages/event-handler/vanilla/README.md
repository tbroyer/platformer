# @webfeet/event-handler-vanilla

Add webfeet to your APIs to help make them [~~swim like a duck~~](https://en.wikipedia.org/wiki/Duck_test) behave like native.

> If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.

[![Published on npm](https://img.shields.io/npm/v/@webfeet%2Fevent-handler-vanilla?logo=npm)](https://www.npmjs.com/package/@webfeet/event-handler-vanilla)

This package exports a decorator to turn an auto-accessor property (whose names must start with `on`) into an event handler, with support for an event handler attribute.

The decorator accepts an optional argument as an object with optional properties:

- `type`: the event name to listen to. If not specified, defaults to the name of the property with the mandatory `on` prefix removed.

- `attribute`: the event handler attribute name; must start with `on`. If not specified, defaults to the name of the property, lowercased.

> [!IMPORTANT]
> Because event handler attributes are evaluated dynamically by the custom element, they'll report to a `script-src` content security policy, not `script-src-attr` like native event handlers.
> Also, because they need to be evaluated within specific contexts, the script that will actually be evaluated won't directly be the event handler attribute's value;
> this means a content security policy won't be able to use `'unsafe-hashes'` with hash sources, unless hashes are computed for the actually evaluated script (which will be dependent on the version of this package);
> in other words `'unsafe-inline'` will be the easiest to setup, but also the least secure.
>
> If you don't need support for event handler attributes, you can directly use the decorator from [_@platform/event-handler_](../core/README.md#decorator) in your custom element.

## Usage

To integrate with `attributeChangedCallback`, the decorator store metadata on the element's class using [_@webfeet/vanilla-core_](../../vanilla-core/README.md).

The functions `getObservedAttributes(elementClass)` and `reflectAttributeToProperty(element, attributeName, oldValue, newValue)`
can be used to implement the `static observedAttributes` property and `attributeChangedCallback` respectively.

```js
import {
  eventHandler,
  getObservedAttributes,
  reflectAttributeToProperty,
} from "@webfeet/event-handler-vanilla";

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
import { BaseElement, eventHandler } from "@webfeet/event-handler-vanilla";

class MyElement extends BaseElement {
  @eventHandler() accessor onfoo;
}
```

Those `getObservedAttributes`, `reflectAttributeToProperty`, and `BaseElement` are directly re-exported from _@webfeet/vanilla-core_ for convenience.

## TypeScript

The event must be registered in `HTMLElementEventMap`:

```ts
declare global {
  interface HTMLElementEventMap {
    foo: FooEvent;
  }
}
```

The decorator must be applied on an auto-accessor property in a class extending `HTMLElement`.
The decorated property's type must be a function taking the above-registered event type as an argument, or `null`:

```ts
type OnfooEventHandler = ((this: MyElement, event: FooEvent) => any) | null;
class MyElement extends BaseElement {
  @eventHandler() accessor onfoo: OnfooEventHandler = null;
}
```

You can also use the `EventHandler` type (directly re-exported from _@webfeet/event-handler_) as the property type; in this case `EventHandler<MyElement, FooEvent>`.
