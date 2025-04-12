import { expect, test } from "tstyche";
import { eventHandler } from "@webfeet/event-handler";

class FooEvent extends Event {}

declare global {
  interface HTMLElementEventMap {
    foo: FooEvent;
  }
}

class MyObject extends EventTarget {
  @(expect(eventHandler({ type: "foo" })).type.toBeApplicable)
  accessor onfoo: ((this: MyObject, event: FooEvent) => any) | null = null;
}

test("not an EventTarget", () => {
  class NotAnEventTarget {
    @(expect(eventHandler()).type.not.toBeApplicable)
    accessor onfoo: ((this: NotAnEventTarget, event: FooEvent) => any) | null =
      null;
  }
});
