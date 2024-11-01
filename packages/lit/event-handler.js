import { EventHandlerHelper } from "@platformer/event-handler";

/**
 * @param {NonNullable<Parameters<import("@platformer/types/event-handler.js").eventHandler>>} options
 * @param {ClassAccessorDecoratorContext} context
 */
function validateContext({ type, attribute }, context) {
  if (context.kind !== "accessor" || context.static) {
    throw new Error(
      "Decorator must be applied to a non-static auto-accessor property",
    );
  }
  if (context.private && (type == null || attribute == null)) {
    throw new Error(
      "Decorator applied to a private property must have explicit 'type' and 'attribute'",
    );
  }
  if ((type == null || attribute == null) && !context.name.startsWith("on")) {
    throw new Error(
      "Decorator without explicit 'type' or 'attribute' must be applied to a property whose name starts with 'on'",
    );
  }
  if (attribute != null && !attribute.toLowerCase().startsWith("on")) {
    throw new Error("Decorator's 'attribute' must start with 'on'");
  }
  type ??= context.name.substring(2);
  attribute ??= context.name.toLowerCase();
  return { type, attribute };
}

/** @type {import("@platformer/types/event-handler.js").eventHandler} */
export function eventHandler(options = {}) {
  return function (_, context) {
    const { type, attribute } = validateContext(options, context);

    let handler;
    const privateProperty = Symbol();
    context.addInitializer(function () {
      handler = new EventHandlerHelper(type, this);
      Object.defineProperty(this, privateProperty, {
        set(value) {
          handler.fromAttribute(value);
        },
      });
    });

    let properties = globalThis.litPropertyMetadata.get(context.metadata);
    if (properties === undefined) {
      globalThis.litPropertyMetadata.set(
        context.metadata,
        (properties = new Map()),
      );
    }
    properties.set(privateProperty, {
      attribute,
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
