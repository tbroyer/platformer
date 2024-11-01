# Platformer

This repository contains libraries to help implement:

- [attribute reflection](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes "HTML Living Standard: Reflecting content attributes in IDL attributes") and [event handlers](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-attributes "HTML Living Standard: Event handlers") in custom elements in a way that's as close as possible to how built-in elements work
- [type coercion](https://webidl.spec.whatwg.org/#js-type-mapping "Web IDL Living Standard: JavaScript type mapping") for property values and method arguments, following the rules of WebIDL (with small exceptions for edge-cases, to keep the library lightweight)

See [this blog post](https://blog.ltgt.net/web-component-properties/ "Making Web Component properties behave closer to the platform") for details.

## Packages

- [**@platformer/webidl**](packages/webidl/README.md) implements the [WebIDL type coercion rules](https://webidl.spec.whatwg.org/#js-type-mapping)
- [**@platformer/reflect**](packages/reflect/README.md) implements the [HTML attribute reflection rules](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes)
- [**@platformer/event-handler**](packages/event-handler/README.md) implements the [HTML event handler rules](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-attributes)
- [**@platform/vanilla**](packages/vanilla/README.md) implements decorators for use with vanilla (i.e. without any library/framework) custom elements
- [**@platformer/lit**](packages/lit/README.md) implements decorators for use with Lit elements, replacing Lit's `@property()` decorators

Internal/subsidiary packages:

- [**@platformer/types**](packages/types/README.md) contains TypeScript types for decorators (to be implemented in framework-specific libraries) that could theoretically encapsulate the _@platform/reflect_ package to cut verbosity by at least 50%
- [**@platformer/microsyntaxes**](packages/microsyntaxes/README.md) implements the [HTML common microsyntaxes](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html)
- The [test harness](packages/harness/README.md)

- A [FAST implementation](packages/fast/README.md)
