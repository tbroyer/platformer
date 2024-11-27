import { LitElement } from "lit";
import type { EventHandler } from "@platformer/event-handler";

interface ClassAccessorDecorator<This, Value> {
  (
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>,
  ): ClassAccessorDecoratorResult<This, Value>;
}

export function eventHandler<
  This extends LitElement,
  EventType extends keyof HTMLElementEventMap,
>(options?: {
  type?: EventType;
  attribute?: `on${string}`;
}): ClassAccessorDecorator<
  This,
  EventHandler<This, HTMLElementEventMap[EventType]>
>;
