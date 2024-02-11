# Platformer

This repository contains libraries to help implement:

- [attribute reflection](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes "HTML Living Standard: Reflecting content attributes in IDL attributes") in custom elements in a way that's as close as possible to how built-in elements work
- [type coercion](https://webidl.spec.whatwg.org/#js-type-mapping "Web IDL Living Standard: JavaScript type mapping") for property values and method arguments, following the rules of WebIDL (with small exceptions for edge-cases, to keep the library lightweight)

See [this blog post](https://blog.ltgt.net/web-component-properties/ "Making Web Component properties behave closer to the platform") for details.

## Packages

- [**@platformer/webidl**](packages/webidl/README.md) implements the [WebIDL type coercion rules](https://webidl.spec.whatwg.org/#js-type-mapping)
- [**@platformer/microsyntaxes**](packages/microsyntaxes/README.md) implements the [HTML common microsyntaxes](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html)
- [**@platformer/reflect**](packages/reflect/README.md) implements the [HTML attribute reflection rules](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes)
- [**@platformer/types**](packages/types/README.md) contains TypeScript types for decorators (to be implemented in framework-specific libraries) that could theoretically encapsulate the _@platform/reflect_ package to cut verbosity by at least 50%
- The [test harness](packages/harness/README.md)

- A [vanilla implementation](packages/vanilla/README.md) (i.e. without any library/framework)
- A [Lit implementation](packages/lit/README.md)
- A [FAST implementation](packages/fast/README.md)
