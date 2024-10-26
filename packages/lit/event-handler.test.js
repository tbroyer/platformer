import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { runTests } from "@platformer/harness/event-handler.js";
import { eventHandler } from "@platformer/lit/event-handler.js";

/* eslint-disable no-unused-vars */

@customElement("test-handler")
class TestHandler extends LitElement {
  @eventHandler()
  accessor onfoo;
}

runTests();
