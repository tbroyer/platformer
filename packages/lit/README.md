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

> [!IMPORTANT]
> The decorators _entirely_ implement the annotated properties' accessors, such that other decorators applied _after_ them won't have any effect on the getter and setter (they could still add initializers though)
