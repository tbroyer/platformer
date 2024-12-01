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
 * This a genericized (and restricted to `HTMLElement`) equivalent to [the HTML spec's `EventHandler`](https://html.spec.whatwg.org/multipage/webappapis.html#eventhandler).
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
 * This can be used for custom elements as well as non-element objects.
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
 * Custom elements, in addition, need to augment the `HTMLElementEventMap` and observe the HTML attribute:
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
 *   static observedAttributes = ["onfoo"];
 *   attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
 *     // in this case, we know 'name' is necessarily 'onfoo' so we can skip any check
 *     this.#onfoo.fromAttribute(newValue);
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
  EventType extends string,
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
   * Implements the [attribute change steps](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-content-attributes) for the event handler.
   *
   * Call this method from an `attributeChangedCallback` of a custom element.
   * You can safely ignore this method if you're implementing an event handler for a non-element.
   *
   * @param value - The new value of the attribute
   */
  fromAttribute(value: string | null): void;

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
