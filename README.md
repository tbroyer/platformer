# Platformer

This repository contains a test harness for HTML attribute reflection, and will contain libraries to help implement:

- [attribute reflection](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes "HTML Living Standard: Reflecting content attributes in IDL attributes") in custom elements in a way that's as close as possible to how built-in elements work
- [type coercion](https://webidl.spec.whatwg.org/#js-type-mapping "Web IDL Living Standard: JavaScript type mapping") for property values and method arguments, following the rules of WebIDL (with small exceptions for edge-cases, to keep the library lightweight)

See [this blog post](https://blog.ltgt.net/web-component-properties/ "Making Web Component properties behave closer to the platform") for details.

This repository forked from [Custom Elements Reflection Tests](https://github.com/tbroyer/custom-elements-reflection-tests) so the code is tested in various environments (vanilla web components, Lit, and FAST). The goal is to progressively rewrite the [library of helpers](packages/helpers/README.md) to _real_ libraries, updating the tests and making sure they continue to pass as things go.

## Test Harness

- The [test harness](packages/harness/README.md) itself
- A [library of helpers](packages/helpers/README.md) to help implement an accurate behavior (to be reimplemented)

## Libraries

- A [vanilla implementation](packages/vanilla/README.md) (i.e. without any library/framework)
- A [Lit implementation](packages/lit/README.md)
- A [FAST implementation](packages/fast/README.md)
