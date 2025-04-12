import type { EventHandler } from "@webfeet/event-handler";

export type { EventHandler };

/**
 * Implements the property as an [event handler](https://html.spec.whatwg.org/multipage/webappapis.html#event-handlers).
 *
 * @param options.type - The event type to listen to, inferred from the property name if unset
 * @param options.attribute - The attribute name, inferred from the property name if unset
 */
export declare function eventHandler<
  EventType extends keyof HTMLElementEventMap,
>(options?: {
  type?: EventType;
  attribute?: `on${string}`;
}): <This extends EventTarget>(
  target: ClassAccessorDecoratorTarget<
    This,
    EventHandler<This, HTMLElementEventMap[EventType]>
  >,
  context: ClassAccessorDecoratorContext<
    This,
    EventHandler<This, HTMLElementEventMap[EventType]>
  >,
) => ClassAccessorDecoratorResult<
  This,
  EventHandler<This, HTMLElementEventMap[EventType]>
>;
