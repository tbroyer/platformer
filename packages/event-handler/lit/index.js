import { EventHandlerHelper } from "@webfeet/event-handler/with-attribute.js";

/**
 * @param {NonNullable<Parameters<import("./index.js").eventHandler>[0]>} options
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
  if (
    (type == null || attribute == null) &&
    (typeof context.name !== "string" || !context.name.startsWith("on"))
  ) {
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

const HANDLERS = Symbol();

/** @type {import("./index.js").eventHandler} */
export function eventHandler(options = {}) {
  return function (_, context) {
    const { type, attribute } = validateContext(options, context);
    const { name } = context;

    const privateProperty = Symbol();
    context.addInitializer(function () {
      const handler = new EventHandlerHelper(this, type);
      (this[HANDLERS] ??= {})[name] = handler;
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
        return this[HANDLERS][name].get();
      },
      set(value) {
        this[HANDLERS][name].set(value);
      },
    };
  };
}
