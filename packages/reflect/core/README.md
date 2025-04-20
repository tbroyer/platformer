# @webfeet/reflect

Add webfeet to your APIs to help make them [~~swim like a duck~~](https://en.wikipedia.org/wiki/Duck_test) behave like native.

> If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.

This package implements the [HTML attribute reflection rules](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes) for all types (`DOMString`, `DOMString?`, `USVString` representing an URL, `boolean`, `long`, `unsigned long`, `double`, element, frozen array of elements, and an emulated `DOMTokenList` implementation).

## API

This package exports constants and functions whose name starts with `reflect` and whose value or the value they return, collectively known as _reflectors_, is an object with three functions and one constant:

- `fromAttribute` takes a string or `null` as its single argument, coming directly from an HTML attribute, and implements the _getter_ steps of the reflection rules, returning a value of the appropriate type
- `coerceValue` takes any value as its single argument, and coerces it to the appropriate type following the [WebIDL rules](https://webidl.spec.whatwg.org/#js-type-mapping); it's generally directly one of the `coerceTo` functions exported by [_@webfeet/webidl_](../webidl/README.md)
- `setAttribute` takes three arguments: the HTML element, the attribute name, and the attribute's value (of the same type as returned by `coerceValue`), and implements the _setter_ steps of the reflection rules
- `defaultValue` is the default value one should initialize a property to behave as if an element had no HTML attribute (in other words, this is the value that will be returned by `fromAttribute(null)`)

Those functions aren't methods of the returned object, they don't rely on their `this`, so they can be stored in variables and then directly called.

_Enumerated attributes_ (and nullable enumerated attributes) take options as properties of an object passed to the exported functions:

- `keywords` is the list of _canonical keywords_ (the ones that can be returned from `fromAttribute`)
- `aliases` is an object mapping a non-canonical keyword to a canonical keyword
- `missing` represents the _missing default value_, that will be the `defaultValue` and will be returned by `fromAttribute(null)`
- `invalid` represents the _invalid default value_, that will be returned by `fromAttribute` when the value doesn't match any known keyword (canonical or alias)

Only the `keywords` option is mandatory, all others are optional.

_Numbers_ take options as properties of an object passed to the exported function. Most numbers only take a single, optional, option: `defaultValue`, the default value used when the attribute is absent or cannot be parsed to a number.

_Clamped integers_ also take two mandatory options in addition to the optional `defaultValue`: `min` and `max` represent the bounds of the range the value is clamped to.

The `reflectURL` constant is slightly different from all the others, as it doesn't have a `defaultValue` and its `fromAttribute` takes two arguments: the HTML element, and then a string or `null` as the value coming from the HTML attribute. This is because the value of a `USVString` attribute representing a URL relies on the document's _base URL_, which can change at any time.

The `reflectElementReference` and `reflectElementReferences` functions are factories of _stateful_ reflectors, whose API is a bit different from the other _stateless_ reflectors.
The factory function itself takes the element as the first argument, and optionally an element type (e.g. `HTMLDivElement`) to filter the elements referenced by ID from the attribute. If not given, the second argument defaults to `Element`.
The returned stateful reflector is an object with internal state and 4 functions:

- `get` takes no argument, and implements the _getter_ steps of the reflection rules, computing and returning the referenced element(s). For `reflectElementReference`, the returned value is either an element of the type passed to the constructor, or `null`. For the `reflectElementReferences`, the value is a frozen array of elements of the type passed to the constructor, or `null`.
- `fromAttribute` takes a string or `null` as its single argument, coming directly from an HTML attribute, and updates the reflector's internal state, not returning anything.
- `coerceValue` takes any value as its single argument, and coerces it to the appropriate type (same as `get`).
- `setAttribute` takes two arguments: the attribute name, and the attribute's value (of the same type as returned by `coerceValue`), and implements the _setter_ steps of the reflection rules.

A property backed by `reflectElementReference` should have its name suffixed with `Element` (relative to the HTML attribute name).
A property backed by `reflectElementReferences` should have its name suffixed with `Elements`.

Finally, `reflectDOMTokenList` is a factory for _stateful_ reflector of an emulation of a `DOMTokenList` (it's not technically possible to use the native `DOMTokenList` type; this means that `instanceof DOMTokenList` will be `false` but should otherwise be transparent).
The factory function itself takes the element and attribute name as the first two arguments, and optionally a list of _supported tokens_.
The returned stateful reflector is an object holding an emulated-`DOMTokenList` instance and exposing a property and 2 functions:

- `value` is a property returning the emulated-`DOMTokenList` instance on getting, and that can be set with a string (that will be forwarded to the `DOMTokenList`'s own `value` property, and will update the associated element's attribute)
- `fromAttribute` takes a string or `null` as its single argument, coming directly from an HTML attribute, and updates the emulated-`DOMTokenList` instance hold by the reflector
- `coerceValue` takes any value as its single argument, and coerces it to a string that can be assigned to the `value` property. Contrary to other reflectors, this function actually only needs to be called if the setter does more things with the new value than just passing it down to the reflector's `value`, as that one will also do that coercion on its own anyway.

## Usage

The (stateless) reflectors are meant to be used in two possible ways (except for `reflectURL`):

- either applying the _getter_ steps in the property getter, as specificied in HTML

  ```js
  class MyElement extends HTMLElement {
    get prop() {
      return reflector.fromAttribute(this.getAttribute("prop"));
    }
    set prop(value) {
      value = reflector.coerceValue(value);
      reflector.setAttribute(this, "prop", value);
    }
  }
  ```

- or applying the _getter_ steps whenever the attribute changes, and caching the result (this approach is not compatible with `reflectURL`)

  ```js
  class MyElement extends HTMLElement {
    #prop = reflector.defaultValue;

    static observedAttributes = ["prop"];

    attributeChangedCallback(name, oldValue, newValue) {
      // in this case, we know 'name' is necessarily 'prop' so we can skip any check
      this.#prop = reflector.fromAttribute(newValue);
    }
    get prop() {
      return this.#prop;
    }
    set prop(value) {
      value = reflector.coerceValue(value);
      reflector.setAttribute(this, "prop", value);
    }
  }
  ```

The reason the `coerceValue` and `setAttribute` are separated is to allow for custom steps to be added in between. `coerceValue` should always be the first thing called in the setter to coerce the input value, and `setAttribute` will most likely always be the last.

The stateful reflectors however require the use of `attributeChangedCallback`.

Here's an example with an element reference reflector:

```js
class MyElement extends HTMLElement {
  #prop = reflectElementReference(this);

  static observedAttributes = ["prop"];

  attributeChangedCallback(name, oldValue, newValue) {
    // in this case, we know 'name' is necessarily 'prop' so we can skip any check
    this.#prop.fromAttribute(newValue);
  }
  get propElement() {
    return this.#prop.get();
  }
  set propElement(value) {
    value = this.#prop.coerceValue(value);
    this.#prop.setAttribute("prop", value);
  }
}
```

and here's one with an emulated-`DOMTokenList`:

```js
class MyElement extends HTMLElement {
  #prop = reflectDOMTokenList(this, "prop");

  static observedAttributes = ["prop"];

  attributeChangedCallback(name, oldValue, newValue) {
    // in this case, we know 'name' is necessarily 'prop' so we can skip any check
    this.#prop.fromAttribute(newValue);
  }
  get prop() {
    return this.#prop.value;
  }
  set prop(value) {
    // No need to use coerceValue if we don't do anything else with the value
    this.#prop.value = value;
  }
}
```
