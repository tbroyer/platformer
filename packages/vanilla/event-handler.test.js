import { runTests } from "@platformer/harness/event-handler.js";
import {
  eventHandler,
  BaseElement,
} from "@platformer/vanilla/event-handler.js";

customElements.define(
  "test-handler",
  class extends BaseElement {
    @eventHandler()
    accessor onfoo;
  },
);

runTests();
