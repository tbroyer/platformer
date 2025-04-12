# Webfeet

This repository contains libraries to help create objects (including custom elements) that behave closer to the _web platform_ as currently spec'd; namely:

- [**attribute reflection**](packages/reflect/README.md) in custom elements
- [**event handlers**](packages/event-handler/README.md) in objects and custom elements
- [**type coercion**](packages/webidl/README.md) for property values and method arguments, following the rules of WebIDL (with small exceptions for edge-cases, to keep the library lightweight)

Internal/subsidiary packages:

- [@webfeet/microsyntaxes](packages/microsyntaxes/README.md) implements the [HTML common microsyntaxes](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html)
- [@webfeet/vanilla-core](packages/vanilla-core/README.md) exposes helpers for implementing (and then using) decorators for vanilla custom elements, that need to observe attributes.
