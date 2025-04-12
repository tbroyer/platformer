import { expect, test } from "tstyche";
import { eventHandler } from "@webfeet/event-handler-lit";
import { LitElement, ReactiveElement } from "lit";

class FooEvent extends Event {}

declare global {
  interface HTMLElementEventMap {
    foo: FooEvent;
  }
}

class MyReactiveElement extends ReactiveElement {
  @(expect(eventHandler({ type: "foo", attribute: "onfoo" })).type
    .toBeApplicable)
  accessor onfoo: ((this: MyReactiveElement, event: FooEvent) => any) | null =
    null;
}
class MyLitElement extends LitElement {
  @(expect(eventHandler({ type: "foo", attribute: "onfoo" })).type
    .toBeApplicable)
  accessor onfoo: ((this: MyLitElement, event: FooEvent) => any) | null = null;
}

test("not an EventTarget", () => {
  class NotAnEventTarget {
    @(expect(eventHandler()).type.not.toBeApplicable)
    accessor onfoo: ((this: NotAnEventTarget, event: FooEvent) => any) | null =
      null;
  }
});
test("not a ReactiveElement", () => {
  class NotAReactiveElement extends HTMLElement {
    @(expect(eventHandler()).type.not.toBeApplicable)
    accessor onfoo:
      | ((this: NotAReactiveElement, event: FooEvent) => any)
      | null = null;
  }
});
test("event type not registered on HTMLElementEventMap", () => {
  expect(eventHandler).type.not.toBeCallableWith({ type: "bar" });
});
test("attribute name does not start with 'on'", () => {
  expect(eventHandler).type.not.toBeCallableWith({ attribute: "foo" });
});
