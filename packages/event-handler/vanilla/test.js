import { runTests } from "@platformer/event-handler-harness";
import { eventHandler, BaseElement } from "@platformer/event-handler-vanilla";

customElements.define(
  "test-handler",
  class extends BaseElement {
    @eventHandler()
    accessor onfoo;
  },
);

runTests();
