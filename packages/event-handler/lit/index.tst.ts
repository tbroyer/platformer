import { expect, test } from "tstyche";
import { eventHandler } from "@webfeet/event-handler-lit";
import { LitElement, ReactiveElement } from "lit";

class FooEvent extends Event {}

declare global {
  interface HTMLElementEventMap {
    foo: FooEvent;
  }
}

expect(
  class MyElement extends ReactiveElement {
    @eventHandler({ type: "foo", attribute: "onfoo" })
    accessor onfoo: ((this: MyElement, event: FooEvent) => any) | null = null;
  },
).type.not.toRaiseError();
expect(
  class MyElement extends LitElement {
    @eventHandler({ type: "foo", attribute: "onfoo" })
    accessor onfoo: ((this: MyElement, event: FooEvent) => any) | null = null;
  },
).type.not.toRaiseError();

test("not an EventTarget", () => {
  expect(
    class NotAnEventTarget {
      @eventHandler() accessor onfoo:
        | ((this: NotAnEventTarget, event: FooEvent) => any)
        | null = null;
    },
  ).type.toRaiseError(1240, 1270);
});
test("not a ReactiveElement", () => {
  expect(
    class NotAReactiveElement extends HTMLElement {
      @eventHandler() accessor onfoo:
        | ((this: NotAReactiveElement, event: FooEvent) => any)
        | null = null;
    },
  ).type.toRaiseError(1240, 1270);
});
test("event type not registered on HTMLElementEventMap", () => {
  expect(
    class extends ReactiveElement {
      @eventHandler({ type: "bar" })
      accessor onfoo: ((event: FooEvent) => any) | null = null;
    },
  ).type.toRaiseError(
    `Type '"bar"' is not assignable to type 'keyof HTMLElementEventMap | undefined'`,
  );
});
test("attribute name does not start with 'on'", () => {
  expect(
    class extends ReactiveElement {
      @eventHandler({ attribute: "foo" })
      accessor onfoo: ((event: FooEvent) => any) | null = null;
    },
  ).type.toRaiseError(
    "Type '\"foo\"' is not assignable to type '`on${string}`'.",
  );
});
