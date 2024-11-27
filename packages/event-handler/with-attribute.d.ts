import { EventHandlerHelper as BaseEventHandlerHelper } from "./index.js";

/**
 * Helper class to implement an [event handler](https://html.spec.whatwg.org/multipage/webappapis.html#event-handlers) for a custom element that handles an HTML event handler attribute.
 *
 * In addition to the getter and setter like with {@link BaseEventHandlerHelper | EventHandlerHelper} base class, you have to augment the `HTMLElementEventMap` and observe the HTML attribute.
 *
 * @example
 *
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
 * @typeParam Target - The custom element
 * @typeParam EventType - The event type to listen for
 * @typeParam TEvent - The type of the event
 */
export declare class EventHandlerHelper<
  Target extends HTMLElement,
  EventType extends keyof HTMLElementEventMap,
> extends BaseEventHandlerHelper<
  Target,
  EventType,
  HTMLElementEventMap[EventType]
> {
  /**
   * Implements the [attribute change steps](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-content-attributes) for the event handler.
   *
   * Call this method from the `attributeChangedCallback` of the custom element.
   *
   * @param value - The new value of the attribute
   */
  fromAttribute(value: string | null): void;
}
