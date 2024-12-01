import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { runTests } from "@platformer/event-handler-harness";
import { eventHandler } from "@platformer/event-handler-lit";

/* eslint-disable no-unused-vars */

@customElement("test-handler")
class TestHandler extends LitElement {
  @eventHandler()
  accessor onfoo;
}

runTests();
