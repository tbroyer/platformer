import { coerceToLegacyCallbackFunction } from "@platformer/webidl";

class InternalRawUncompiledHandler {
  value;
  // XXX: location?

  constructor(value) {
    this.value = value;
  }
}

export class EventHandlerHelper {
  #target;
  #type;
  #value = null;
  #listener;

  /**
   * @param {This} target
   * @param {EventType} type
   */
  constructor(target, type) {
    this.#target = target;
    this.#type = type;
  }

  fromAttribute(value) {
    if (value == null) {
      this.#deactivate();
    } else if (!blockedByCSP(value)) {
      this.#value = new InternalRawUncompiledHandler(String(value));
      this.#activate();
    }
  }

  get() {
    // https://html.spec.whatwg.org/multipage/webappapis.html#getting-the-current-value-of-the-event-handler
    if (this.#value instanceof InternalRawUncompiledHandler) {
      try {
        // First parse the function body directly (to detect some forms of injection)
        new Function("event", this.#value.value);
        // …then re-parse with this "one neat trick" to set the function's name and sourceText as spec'd,
        // as well as defining its scope through with(){}
        // Using 'this' for the target avoids introducing a variable name that would be in-scope
        this.#value = new Function(
          `
          with (document) {
            // form-associated elements must have a public 'form' property
            with (this.form ?? {}) {
              with (this) {
                return function on${this.#type}(event) {\n${this.#value.value}\n};
              }
            }
          }`,
        ).call(this.#target);
      } catch (e) {
        globalThis.reportError(e);
        this.#value = null;
      }
    }
    return this.#value;
  }

  set(value) {
    value = coerceToLegacyCallbackFunction(value);
    if (value == null) {
      this.#deactivate();
    } else {
      this.#value = value;
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
    this.#target.addEventListener(this.#type, this.#listener);
  }

  // https://html.spec.whatwg.org/multipage/webappapis.html#deactivate-an-event-handler
  #deactivate() {
    this.#value = null;
    if (this.#listener != null) {
      this.#target.removeEventListener(this.#type, this.#listener);
      this.#listener = null;
    }
  }
}

function blockedByCSP(value) {
  let observer;
  if (typeof ReportingObserver === "function") {
    observer = new ReportingObserver(() => {}, {
      types: ["csp-violation"],
      buffered: false,
    });
    observer.observe();
  }
  try {
    new Function(value);
  } catch (e) {
    if (e instanceof EvalError) {
      return (
        observer
          ?.takeRecords()
          .some(
            (r) =>
              r.type === "csp-violation" &&
              r.body.effectiveDirective === "script-src" &&
              r.body.blockedURL === "eval" &&
              r.body.disposition === "enforce",
          ) ??
        // Only the case of Firefox nowadays but try to match a bit wider
        /\b(?:unsafe-eval|CSP)\b/.test(e.message)
      );
    }
  } finally {
    observer?.disconnect();
  }
  return false;
}
