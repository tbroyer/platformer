import { expect, test } from "tstyche";
import { eventHandler } from "@webfeet/event-handler-vanilla";

class FooEvent extends Event {}

declare global {
  interface HTMLElementEventMap {
    foo: FooEvent;
  }
}

class MyElement extends HTMLElement {
  @(expect(eventHandler({ type: "foo", attribute: "onfoo" })).type
    .toBeApplicable)
  accessor onfoo: ((this: MyElement, event: FooEvent) => any) | null = null;
}

test("not an HTMLElement", () => {
  class NotAnHTMLElement {
    @(expect(eventHandler()).type.not.toBeApplicable)
    accessor onfoo: ((this: NotAnHTMLElement, event: FooEvent) => any) | null =
      null;
  }
});
test("event type not registered on HTMLElementEventMap", () => {
  expect(eventHandler).type.not.toBeCallableWith({ type: "bar" });
});
test("attribute name does not start with 'on'", () => {
  expect(eventHandler).type.not.toBeCallableWith({ attribute: "foo" });
});
