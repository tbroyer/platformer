# @webfeet/event-handler-lit

Exports a decorator to turn an auto-accessor property (whose names must start with `on`) into an event handler, with support for an event handler attribute.

The decorator accepts an optional argument as an object with optional properties:

- `type`: the event name to listen to. If not specified, defaults to the name of the property with the mandatory `on` prefix removed.

- `attribute`: the event handler attribute name; must start with `on`. If not specified, defaults to the name of the property, lowercased.

> [!IMPORTANT]
> Because event handler attributes are evaluated dynamically by the custom element, they'll report to a `script-src` content security policy, not `script-src-attr` like native event handlers.
> Also, because they need to be evaluated within specific contexts, the script that will actually be evaluated won't directly be the event handler attribute's value;
> this means a content security policy won't be able to use `'unsafe-hashes'` with hash sources, unless hashes are computed for the actually evaluated script (which will be dependent on the version of this package);
> in other words `'unsafe-inline'` will be the easiest to setup, but also the least secure.
>
> If you don't need support for event handler attributes, you can directly use the decorator from [_@platform/event-handler_](../core/README.md#decorator) in your Lit element.

## Usage

> [!NOTE]
> Setting an event handler won't trigger an update.

```js
import { LitElement, customElement, html } from "lit";
import { eventHandler } from "@webfeet/event-handler";

@customElement("my-element")
class MyElement extends LitElement {
  // Will listen for a `foo` event
  // Can be set in HTML using an `onfoo=""` attribute
  @eventHandler() accessor onfoo;

  render() {
    return html`This won't re-render when <code>onfoo</code> is changed.`;
  }
}
```

## TypeScript

The event must be registered in `HTMLElementEventMap`:

```ts
declare global {
  interface HTMLElementEventMap {
    foo: FooEvent;
  }
}
```

The decorator must be applied on an auto-accessor property in a class extending `LitElement`.
The decorated property's type must be a function taking the above-registered event type as an argument, or `null`:

```ts
type OnfooEventHandler = ((this: MyElement, event: FooEvent) => any) | null;
class MyElement extends LitElement {
  @eventHandler() accessor onfoo: OnfooEventHandler = null;
}
```

You can also use the `EventHandler` type (directly re-exported from _@webfeet/event-handler_) as the property type; in this case `EventHandler<MyElement, FooEvent>`.
