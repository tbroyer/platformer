# Webfeet

This repository contains libraries to help create objects (including custom elements) that behave closer to the _web platform_ as currently spec'd; namely:

- [**attribute reflection**](packages/reflect/README.md) in custom elements
- [**event handlers**](packages/event-handler/README.md) in objects and custom elements
- [**type coercion**](packages/webidl/README.md) for property values and method arguments, following the rules of WebIDL (with small exceptions for edge-cases, to keep the library lightweight)

Internal/subsidiary packages:

- [@webfeet/microsyntaxes](packages/microsyntaxes/README.md) implements the [HTML common microsyntaxes](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html)
- [@webfeet/vanilla-core](packages/vanilla-core/README.md) exposes helpers for implementing (and then using) decorators for vanilla custom elements, that need to observe attributes.

## What about this name?

Add webfeet to your APIs to help make them [~~swim like a duck~~](https://en.wikipedia.org/wiki/Duck_test) behave like native.

> If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.

And of course, it has _web_ in the name.

Some other names I considered (most of them were already taken):

- _platformer_: like the platformer video games, where you need to stay close to the platforms
- _jarod_: the main character of _The Pretender_ TV series
- _mimetic_ or _mimetism_: in reference to _biomimetism_ where we use nature as an inspiration to solve technical problems, here taking _the platform_ as inspiration
- _ducklike_ or _anatine_: pertaining to or ressembling a duck
- _syrinx_: the vocal organ of birds, that allows ducks to quack
- _webfooted_ or _palmiped_ (or _palmipede_ as in French)
