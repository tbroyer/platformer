# @webfeet/reflect-lit

Add webfeet to your APIs to help make them [~~swim like a duck~~](https://en.wikipedia.org/wiki/Duck_test) behave like native.

> If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.

This package exports decorators encapsulating the [_@webfeet/reflect_ package](../core/README.md) to cut verbosity by at least 50%, while integrating with Lit's reactive lifecycle (changes to properties, either directly or through HTML attributes, trigger an update).

Those decorators **replace** Lit's `@property()` decorators, though you can safely mix them on **different** properties inside the same element.
They work the same as `@property()` when it comes to the reactive lifecycle, so the changed properties can be observed in `willUpdate()` or `updated()` ; they differ on when they reflect values to the attributes though, and you cannot cancel such reflection with `shouldUpdate()` like with `@property()` (in other words, reflecting to attributes is decoupled from the reactive lifecycle)

```js
class MyElement extends LitElement {
  @reflectXxx({ ...options }) accessor attr;

  render() {
    return html`The attr property value is <code>${this.attr}</code>.`;
  }
}
```

> [!IMPORTANT]
> The decorators can only be applied to auto-accessor properties, and _entirely_ implement the property's accessors, such that other decorators applied _after_ them won't have any effect on the getter and setter (they could still add initializers though).
