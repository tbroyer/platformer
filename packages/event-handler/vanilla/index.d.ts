import type { EventHandler } from "@platformer/event-handler";

interface ClassAccessorDecorator<This, Value> {
  (
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>,
  ): ClassAccessorDecoratorResult<This, Value>;
}

/**
 * Implements the property as an [event handler](https://html.spec.whatwg.org/multipage/webappapis.html#event-handlers).
 *
 * @param options.type - The event type to listen to, inferred from the property name if unset
 * @param options.attribute - The attribute name, inferred from the property name if unset
 */
export function eventHandler<
  This extends EventTarget,
  EventType extends keyof HTMLElementEventMap,
>(options?: {
  type?: EventType;
  attribute?: `on${string}`;
}): ClassAccessorDecorator<
  This,
  EventHandler<This, HTMLElementEventMap[EventType]>
>;
