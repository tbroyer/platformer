import { runTests } from "@webfeet/event-handler-harness";
import { eventHandler, BaseElement } from "@webfeet/event-handler-vanilla";

customElements.define(
  "test-handler",
  class extends BaseElement {
    @eventHandler()
    accessor onfoo;
  },
);

runTests();
