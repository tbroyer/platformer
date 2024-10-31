# @platformer/types

This package exposes TypeScript types for [decorators](https://github.com/tc39/proposal-decorators) that could theoretically encapsulate the [_@platform/reflect_ package](../reflect/README.md) to cut verbosity by at least 50%.

There are two sets of decorators: direct and cached.

## _Direct_ decorators

_Direct_ decorators (exposed as `@platformer/types/direct.js`) implement auto-accessor properties to directly read and write to HTML attributes, the way reflection is specified in HTML.

```js
@reflectXxx({ ...options }) accessor attr;
```

> [!IMPORTANT]
> The decorators, by definition, _entirely_ implement the annotated properties' accessors, such that other decorators applied _after_ them won't have any effect on the getter and setter (they could still add initializers though)

## _Cached_ decorators

_Cached_ decorators (exposed as `@platformer/types`) implement either auto-accessor properties or property setters to write to HTML attributes, and integrate with some form of `attributeChangeCallback` to process the attribute value only once when it changes, and cache the value in a private field.

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
@reflectXxx({ ...options }) set attr(value) {
    // At the time this is called, the HTML attribute has already been set,
    // and parsed back to the appropriate type.
    // The setter will also be called when the attribute changes in any way.
    this.#attr = value;
}
```

## API

This package exports decorator factories with the same name as the _reflectors_ exported by _@platformer/reflect_. All decorator factories take options as properties of an object passed to the factory.

All decorator factories have an optional `attribute` option giving the name of the HTML attribute that the property reflects. When not given, the lowercased name of the property is used.

Decorator factories also have the same options as the _@platformer/reflect_ function they wrap.

The `reflectURL` decorator, due to the specificities of reflecting a `USVString` attribute representing a URL, can only be applied to auto-accessor properties, whichever the flavor (direct or cached).
