# @platformer/lit

Implements the [_@platformer/types_](../types/README.md) _cached_ decorators while integrating with Lit's reactive lifecycle (changes to properties, either directly or through HTML attributes, trigger an update).
Those decorators **replace** Lit's `@property()` decorators, though you can safely mix them on **different** properties inside the same element.

```js
class MyElement extends LitElement {
  @reflectXxx({ ...options }) accessor attr;

  render() {
    return html`The attr property value is <code>${this.attr}</code>.`;
  }
}
```

The package also implements the event handler decorator (exposed at `@platformer/lit/event-handler.js`) that can be used independently of the reflection decorators.
Setting an event handler won't trigger an update.

```js
class MyElement extends LitElement {
  @eventHandler() accessor onfoo;

  render() {
    return html`This won't re-render when <code>onfoo</code> is changed.`;
  }
}
```

> [!IMPORTANT]
> All decorators _entirely_ implement the annotated properties' accessors, such that other decorators applied _after_ them won't have any effect on the getter and setter (they could still add initializers though)
