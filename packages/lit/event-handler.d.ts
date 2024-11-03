import { eventHandler as genericEventHandler } from "@platformer/types/event-handler.js";
import { LitElement } from "lit";

export type eventHandler<
  This extends LitElement,
  EventType extends keyof HTMLElementEventMap,
> = typeof genericEventHandler<This, EventType, HTMLElementEventMap[EventType]>;
