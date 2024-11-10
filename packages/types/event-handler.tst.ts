import { expect, test } from "tstyche";
import { eventHandler } from "@platformer/types/event-handler.js";

class FooEvent extends Event {}

declare global {
  interface HTMLElementEventMap {
    foo: FooEvent;
  }
}

expect(
  class MyObject extends EventTarget {
    @eventHandler({ type: "foo" }) accessor onfoo:
      | ((this: MyObject, event: FooEvent) => any)
      | null = null;
  },
).type.not.toRaiseError();

expect(
  class MyElement extends HTMLElement {
    @eventHandler({ type: "foo", attribute: "onfoo" })
    accessor onfoo: ((this: MyElement, event: FooEvent) => any) | null = null;
  },
).type.not.toRaiseError();

test("attribute option on non-HTMLElement", () => {
  expect(
    // attribute option on non-HTMLElement
    class MyObject extends EventTarget {
      @eventHandler({ attribute: "onfoo" })
      accessor onfoo: ((this: MyObject, event: FooEvent) => any) | null = null;
    },
  ).type.toRaiseError("'attribute' does not exist in type");
});
test("not an EventTarget", () => {
  expect(
    class NotAnEventTarget {
      @eventHandler() accessor onfoo:
        | ((this: NotAnEventTarget, event: FooEvent) => any)
        | null = null;
    },
  ).type.toRaiseError(1240, 1270);
});
test("event type not registered on HTMLElementEventMap", () => {
  expect(
    class extends HTMLElement {
      @eventHandler({ type: "bar" })
      accessor onfoo: ((event: FooEvent) => any) | null = null;
    },
  ).type.toRaiseError(
    `Type '"bar"' is not assignable to type 'keyof HTMLElementEventMap | undefined'`,
  );
});
test("attribute name does not start with 'on'", () => {
  expect(
    class extends HTMLElement {
      @eventHandler({ attribute: "foo" })
      accessor onfoo: ((event: FooEvent) => any) | null = null;
    },
  ).type.toRaiseError(
    "Type '\"foo\"' is not assignable to type '`on${string}`'.",
  );
});
