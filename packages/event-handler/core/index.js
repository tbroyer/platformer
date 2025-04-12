import { coerceToLegacyCallbackFunction } from "@webfeet/webidl";
import { TARGET, TYPE, VALUE } from "./internal.js";

export class EventHandlerHelper {
  [TARGET];
  [TYPE];
  [VALUE] = null;
  #listener;

  constructor(target, type) {
    this[TARGET] = target;
    this[TYPE] = type;
  }

  get() {
    return this[VALUE];
  }

  set(value) {
    value = coerceToLegacyCallbackFunction(value);
    if (value == null) {
      this.#deactivate();
    } else {
      this[VALUE] = value;
      this.#activate();
    }
  }

  // https://html.spec.whatwg.org/multipage/webappapis.html#activate-an-event-handler
  #activate() {
    if (this.#listener != null) {
      return;
    }
    // https://html.spec.whatwg.org/multipage/webappapis.html#the-event-handler-processing-algorithm
    this.#listener = (e) => {
      // Important to call get() here as a hook, and not directly access this[VALUE]
      let callback = this.get();
      if (callback == null) {
        return;
      }
      // https://webidl.spec.whatwg.org/#js-invoking-callback-functions
      if (typeof callback !== "function") {
        return;
      }
      let returnValue = callback.call(e.currentTarget, e);
      if (returnValue === false) {
        e.preventDefault();
      }
    };
    this[TARGET].addEventListener(this[TYPE], this.#listener);
  }

  // https://html.spec.whatwg.org/multipage/webappapis.html#deactivate-an-event-handler
  #deactivate() {
    this[VALUE] = null;
    if (this.#listener != null) {
      this[TARGET].removeEventListener(this[TYPE], this.#listener);
      this.#listener = null;
    }
  }
}

const HANDLERS = Symbol();

/**
 * @param {ClassSetterDecoratorContext | ClassAccessorDecoratorContext} context
 */
function validateContext(context) {
  if (
    (context.kind !== "accessor" && context.kind !== "setter") ||
    context.static ||
    context.private
  ) {
    throw new Error(
      "Decorator must be applied to a non-static, non-private auto-accessor property or setter",
    );
  }
  if (typeof context.name !== "string" || !context.name.startsWith("on")) {
    throw new Error(
      "Decorator must be applied to a property whose name starts with 'on'",
    );
  }
}

/** @type {import("./decorator.js").eventHandler} */
export function eventHandler({ type } = {}) {
  return function (target, context) {
    validateContext(context);
    const { name } = context;
    type ??= name.substring(2).toLowerCase();

    context.addInitializer(function () {
      (this[HANDLERS] ??= {})[name] = new EventHandlerHelper(this, type);
    });

    switch (context.kind) {
      case "accessor":
        return {
          get() {
            return this[HANDLERS][name].get();
          },
          set(value) {
            this[HANDLERS][name].set(value);
          },
          init(value) {
            return value ?? null;
          },
        };
      case "setter":
        context.addInitializer(function () {
          target.call(this, null);
        });
        return function (value) {
          const handler = this[HANDLERS][name];
          handler.set(value);
          target.call(this, handler.get());
        };
      default:
        throw new Error(`Unsupported decorator location: ${context.kind}`);
    }
  };
}
