import { EventHandlerHelper as BaseEventHandlerHelper } from "./index.js";
import { TARGET, TYPE, VALUE } from "./internal.js";

class InternalRawUncompiledHandler {
  value;
  // XXX: location?

  constructor(value) {
    this.value = value;
  }
}

export class EventHandlerHelper extends BaseEventHandlerHelper {
  fromAttribute(value) {
    if (value == null) {
      this.set(value);
    } else if (!blockedByCSP(value, this[TARGET], this[TYPE])) {
      this.set(new InternalRawUncompiledHandler(String(value)));
    }
  }

  get() {
    // https://html.spec.whatwg.org/multipage/webappapis.html#getting-the-current-value-of-the-event-handler
    if (this[VALUE] instanceof InternalRawUncompiledHandler) {
      try {
        this[VALUE] = parseRawUncompiledHandler(
          this[VALUE].value,
          this[TARGET],
          this[TYPE],
        );
      } catch (e) {
        globalThis.reportError(e);
        this[VALUE] = null;
      }
    }
    return super.get();
  }
}

function blockedByCSP(value, target, type) {
  let observer;
  if (typeof ReportingObserver === "function") {
    observer = new ReportingObserver(() => {}, {
      types: ["csp-violation"],
      buffered: false,
    });
    observer.observe();
  }
  try {
    parseRawUncompiledHandler(value, target, type);
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

function parseRawUncompiledHandler(value, target, type) {
  // https://html.spec.whatwg.org/multipage/webappapis.html#getting-the-current-value-of-the-event-handler
  // First parse the function body directly (to detect some forms of injection)
  new Function("event", value);
  // …then re-parse with this "one neat trick" to set the function's name and sourceText as spec'd,
  // as well as defining its scope through with(){}
  // Using 'this' for the target avoids introducing a variable name that would be in-scope
  return new Function(
    `
      with (document) {
        // form-associated elements must have a public 'form' property
        with (this.form ?? {}) {
          with (this) {
            return function on${type}(event) {\n${value}\n};
          }
        }
      }`,
  ).call(target);
}
