import { expect, test } from "tstyche";
import { eventHandler } from "@platformer/event-handler";

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

test("not an EventTarget", () => {
  expect(
    class NotAnEventTarget {
      @eventHandler() accessor onfoo:
        | ((this: NotAnEventTarget, event: FooEvent) => any)
        | null = null;
    },
  ).type.toRaiseError(1240, 1270);
});
