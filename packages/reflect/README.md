# Attribute reflection

Attribute reflection in HTML is the fact that an HTML attribute and a property on the element are kept in sync.

For plain text values (such as an element's `title`), things are rather easy (and even then there can be subtleties!), but there are non-string values (e.g. numbers, possibly constrained), and strings constrained to an enumerated list of values (e.g. the `type` of an `<input>`), that have more complex rules.

If you're curious, you can find details of what that all means [on my blog](https://blog.ltgt.net/web-component-properties/ "Making Web Component properties behave closer to the platform").

- The [**@platformer/reflect**](core/README.md) packages provides helpers to implement attribute reflection in custom elements behaving as closely as possible to built-in elements.
- The [**@platformer/reflect-vanilla**](vanilla/README.md) package provides decorators for use with vanilla custom elements
- The [**@platformer/reflect-lit**](lit/README.md) package provides decorators for use with [Lit](https://lit/dev) elements

If you want to implement a new integration (in addition to vanilla and Lit above), test it with the [test harness](harness/README.md).
