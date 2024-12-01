# Event Handler

Event handlers are those `onxxx` attributes and properties that allow listening to a `xxx` event, like `onload`, `onclick`, or `onmessage`.

- The [**@platformer/event-handler**](core/README.md) package provides helper classes to implement event handlers behaving as closely as possible to [the HTML specification](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-attributes "HTML Living Standard: Event handlers").  
  It also provides a decorator you can use to turn a property into an event handler property (without attribute support).

If you're curious, you can find details on event handler behaviors (and what it means to implement them as closely as possible to the HTML specification) [on my blog](https://blog.ltgt.net/html-event-handlers/ "How do HTML event handlers work?").

If you want support for HTML event handler attributes (rather than just properties) with decorators, use one of these packages:

- The [**@platformer/event-handler-vanilla**](vanilla/README.md) package provides a decorator for use with vanilla custom elements
- The [**@platformer/event-handler-lit**](lit/README.md) package provides a decorator for use with [Lit](https://lit/dev) elements

If you want to implement a new integration (in addition to vanilla and Lit above), test it with the [test harness](harness/README.md).
