import { EventHandlerHelper } from "@platformer/event-handler/with-attribute.js";
import { addAttribute } from "./observed-attributes.js";

export {
  BaseElement,
  getObservedAttributes,
  reflectAttributeToProperty,
} from "./observed-attributes.js";

/**
 * @param {ClassAccessorDecoratorContext} context
 */
function validateContext(context) {
  if (context.kind !== "accessor" || context.static || context.private) {
    throw new Error(
      "Decorator must be applied to a non-static, non-private auto-accessor property",
    );
  }
  if (typeof context.name !== "string" || !context.name.startsWith("on")) {
    throw new Error(
      "Decorator must be applied to an accessor whose name starts with 'on'",
    );
  }
}

/** @type {import("@platformer/types/event-handler.js").eventHandler} */
export function eventHandler({ type, attribute } = {}) {
  return function (_, context) {
    validateContext(context);
    type ??= context.name.substring(2).toLowerCase();
    attribute ??= context.name.toLowerCase();
    if (!attribute.startsWith("on")) {
      throw new Error("eventHandler attribute name must start with 'on'");
    }
    let handler;
    context.addInitializer(function () {
      handler = new EventHandlerHelper(this, type);
    });
    addAttribute(context.metadata, attribute, function (_, newValue) {
      handler.fromAttribute(newValue);
    });
    return {
      get() {
        return handler.get();
      },
      set(value) {
        handler.set(value);
      },
    };
  };
}
