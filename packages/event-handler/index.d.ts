/**
 * Represents a callback used for event handlers.
 *
 * @remarks
 *
 * This a genericized equivalent to [the HTML spec's `EventHandlerNonNull`](https://html.spec.whatwg.org/multipage/webappapis.html#eventhandlernonnull).
 */
export interface EventHandlerNonNull<
  This extends EventTarget,
  E extends Event,
> {
  (this: This, event: E): any;
}

/**
 * Represents a callback used for event handlers.
 *
 * @remarks
 *
 * This a genericized equivalent to [the HTML spec's `EventHandler`](https://html.spec.whatwg.org/multipage/webappapis.html#eventhandler).
 *
 * This type is used in the definition of {@link EventHandlerHelper} but event handlers are generally typed using non-generic function type expression (see the example in {@link EventHandlerHelper}'s documentation).
 */
export type EventHandler<
  This extends EventTarget,
  E extends Event,
> = EventHandlerNonNull<This, E> | null;

/**
 * Helper class to implement an [event handler](https://html.spec.whatwg.org/multipage/webappapis.html#event-handlers).
 *
 * This can be used for custom elements as well as non-element objects (provided they extend `EventTarget`).
 *
 * If you want to support event handler attributes on custom elements, use `@platformer/event-handler/with-attribute.js` instead.
 *
 * @example
 *
 * The simplest case is for a non-element object:
 * ```
 * type OnfooEventHandler = ((this: MyObject, event: FooEvent) => any) | null;
 * class MyObject extends EventTarget {
 *   #onfoo = new EventHandlerHelper(this, "foo");
 *   get onfoo(): OnfooEventHandler {
 *     return this.#onfoo.get();
 *   }
 *   set onfoo(value: OnfooEventHandler) {
 *     this.#onfoo.set(value);
 *   }
 * }
 * ```
 *
 * Custom elements should augment the `HTMLElementEventMap` to get appropriate typing on `addEventListener` and `removeEventListener` for end users:
 * ```
 * declare global {
 *   interface HTMLElementEventMap {
 *     "foo": FooEvent,
 *   }
 * }
 * type OnfooEventHandler = ((this: MyElement, event: FooEvent) => any) | null;
 * class MyElement extends HTMLElement {
 *   #onfoo = new EventHandlerHelper(this, "foo");
 *   get onfoo(): OnfooEventHandler {
 *     return this.#onfoo.get();
 *   }
 *   set onfoo(value: OnfooEventHandler) {
 *     this.#onfoo.set(value);
 *   }
 * }
 * ```
 *
 * @typeParam Target - The event target
 * @typeParam EventType - The event type to listen for
 * @typeParam TEvent - The type of the event
 */
export declare class EventHandlerHelper<
  Target extends EventTarget,
  EventType extends Target extends HTMLElement
    ? keyof HTMLElementEventMap
    : string,
  TEvent extends Event = EventType extends keyof HTMLElementEventMap
    ? HTMLElementEventMap[EventType]
    : Event,
> {
  /**
   * @param target - The event target
   * @param type - The event type to listen for
   */
  constructor(target: Target, type: EventType);

  /**
   * Implements the [getter steps](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-idl-attributes) of the event handler property.
   *
   * Call this method from your event handler property getter.
   *
   * @returns The current value of the event handler
   */
  get(): EventHandler<Target, TEvent>;

  /**
   * Implements the [setter steps](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-idl-attributes) of the event handler property.
   *
   * Call this method from your event handler property setter.
   *
   * @param value - The new value for the event handler
   */
  set(value: EventHandler<Target, TEvent>): void;
}

export type EventHandlerDecorator = {
  // accessor decorator
  <This extends EventTarget, Value extends EventHandler<This, Event>>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>,
  ): ClassAccessorDecoratorResult<This, Value>;

  // setter decorator
  <This extends EventTarget, Value extends EventHandler<This, Event>>(
    target: (this: This, value: Value) => void,
    context: ClassSetterDecoratorContext<This, Value>,
  ): (this: This, value: Value) => void;
};

/**
 * Decorator
 * @param options
 */
export function eventHandler(options?: { type: string }): EventHandlerDecorator;
