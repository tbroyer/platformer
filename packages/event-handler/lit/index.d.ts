import { ReactiveElement } from "lit";
import type { EventHandler } from "@platformer/event-handler";

export type { EventHandler };

export type EventHandlerDecorator<EventType extends keyof HTMLElementEventMap> =
  <This extends ReactiveElement>(
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

export function eventHandler<
  EventType extends keyof HTMLElementEventMap,
>(options?: {
  type?: EventType;
  attribute?: `on${string}`;
}): EventHandlerDecorator<EventType>;
