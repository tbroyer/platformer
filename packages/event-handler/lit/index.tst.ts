import { expect, test } from "tstyche";
import { eventHandler } from "@platformer/event-handler-lit";
import { LitElement } from "lit";

class FooEvent extends Event {}

declare global {
  interface HTMLElementEventMap {
    foo: FooEvent;
  }
}

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
test("not a LitElement", () => {
  expect(
    class NotALitElement extends HTMLElement {
      @eventHandler() accessor onfoo:
        | ((this: NotALitElement, event: FooEvent) => any)
        | null = null;
    },
  ).type.toRaiseError(1240, 1270);
});
test("event type not registered on HTMLElementEventMap", () => {
  expect(
    class extends LitElement {
      @eventHandler({ type: "bar" })
      accessor onfoo: ((event: FooEvent) => any) | null = null;
    },
  ).type.toRaiseError(
    `Type '"bar"' is not assignable to type 'keyof HTMLElementEventMap | undefined'`,
  );
});
test("attribute name does not start with 'on'", () => {
  expect(
    class extends LitElement {
      @eventHandler({ attribute: "foo" })
      accessor onfoo: ((event: FooEvent) => any) | null = null;
    },
  ).type.toRaiseError(
    "Type '\"foo\"' is not assignable to type '`on${string}`'.",
  );
});
