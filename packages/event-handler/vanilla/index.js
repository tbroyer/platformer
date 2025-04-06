import { EventHandlerHelper } from "@platformer/event-handler/with-attribute.js";
import { addAttribute } from "@platformer/vanilla-core";

export {
  BaseElement,
  getObservedAttributes,
  reflectAttributeToProperty,
} from "@platformer/vanilla-core";

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

const HANDLERS = Symbol();

/** @type {import("./index.js").eventHandler} */
export function eventHandler({ type, attribute } = {}) {
  return function (_, context) {
    validateContext(context);
    const { name } = context;
    type ??= name.substring(2).toLowerCase();
    attribute ??= name.toLowerCase();
    if (!attribute.startsWith("on")) {
      throw new Error("eventHandler attribute name must start with 'on'");
    }
    context.addInitializer(function () {
      (this[HANDLERS] ??= {})[name] = new EventHandlerHelper(this, type);
    });
    addAttribute(context.metadata, attribute, function (_, newValue) {
      this[HANDLERS][name].fromAttribute(newValue);
    });
    return {
      get() {
        return this[HANDLERS][name].get();
      },
      set(value) {
        this[HANDLERS][name].set(value);
      },
    };
  };
}
