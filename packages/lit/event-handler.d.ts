import { LitElement } from "lit";
import type { EventHandler } from "@platformer/event-handler";
import { ClassAccessorDecorator } from "@platformer/types/event-handler.js";

export function eventHandler<
  This extends LitElement,
  EventType extends keyof HTMLElementEventMap,
  TEvent extends Event = HTMLElementEventMap[EventType],
>(options?: {
  type?: EventType;
  attribute?: `on${string}`;
}): ClassAccessorDecorator<This, EventHandler<This, TEvent>>;
