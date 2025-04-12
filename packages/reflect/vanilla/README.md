# @webfeet/reflect-vanilla

Add webfeet to your APIs to help make them [~~swim like a duck~~](https://en.wikipedia.org/wiki/Duck_test) behave like native.

> If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.

This package exports decorators encapsulating the [_@webfeet/reflect_ package](../core/README.md) to cut verbosity by at least 50%.

There are two sets of reflection decorators: direct and cached.

It actually comes with 2 distinct implementations:

## _Direct_ decorators

_Direct_ decorators (exposed at `@webfeet/reflect-vanilla`) implement auto-accessor properties to directly read and write to HTML attributes, the way reflection is specified in HTML.

```js
class MyElement extends HTMLElement {
  @reflectXxx({ ...options }) accessor attr;
}
```

> [!IMPORTANT]
> Those decorators can only be applied to auto-accessor properties, and _entirely_ implement the property's accessors, such that other decorators applied _after_ them won't have any effect on the getter and setter (they could still add initializers though).

## _Cached_ decorators

_Cached_ decorators (exposed at `@webfeet/reflect-vanilla/cached.js`) make either auto-accessor properties or property setters to write to HTML attributes, and integrate with `attributeChangeCallback` to process the attribute value only once when it changes, and cache the value in a private field.

```js
@reflectXxx({ ...options }) accessor attr;
```

or (to allow for custom getters, or custom processing in setters)

```js
// The value will be of the appropriate type,
// and initialized to the appropriate default value at construction time.
#attr;
get attr() {
  return this.#attr;
}
@reflectXxx({ ...options })
set attr(value) {
  // At the time this is called, the HTML attribute has already been set,
  // and parsed back to the appropriate type.
  // This setter will also be called when the attribute changes in any way.
  this.#attr = value;
}
```

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

Those `getObservedAttributes`, `reflectAttributeToProperty`, and `BaseElement` are directly re-exported from _@webfeet/vanilla-core_ for convenience.

## API

This package exports decorator factories with the same name as the _reflectors_ exported by _@webfeet/reflect_. All decorator factories take options as properties of an object passed to the factory.

All decorator factories have an optional `attribute` option giving the name of the HTML attribute that the property reflects. When not given, the lowercased name of the property is used.

Decorator factories also have the same options as the _@webfeet/reflect_ function they wrap.

The `reflectURL` decorator, due to the specificities of reflecting a `USVString` attribute representing a URL, can only be applied to auto-accessor properties, whichever the flavor (direct or cached).

The `reflectElementReference` and `reflectElementReferences` only exist as cached decorators, and can only be applied to auto-accessor properties.
They have an optional `type` option corresponding to the second argument of the same-named _@webfeet/reflect_ function they wrap.
