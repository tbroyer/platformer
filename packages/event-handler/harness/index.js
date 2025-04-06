import { assert } from "chai";

function expectGlobalError(fn) {
  /* global Mocha */
  const oldListeners = Array.from(Mocha.process.listeners("uncaughtException"));
  for (const l of oldListeners) {
    Mocha.process.removeListener("uncaughtException", l);
  }
  const oldOnerror = window.onerror;
  try {
    window.onerror = null;

    fn();
  } finally {
    window.onerror = oldOnerror;
    for (const l of oldListeners) {
      Mocha.process.on("uncaughtException", l);
    }
  }
}

export function runTests() {
  customElements.define(
    "x-foo",
    class extends customElements.get("test-handler") {
      static formAssociated = true;
      #internals = this.attachInternals();
      get form() {
        return this.#internals.form;
      }
    },
  );

  suite("event handler", () => {
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/event-handler-all-global-events.html
    test("must be defined on prototype", () => {
      const cls = customElements.get("test-handler");
      // XXX: assert.property(cls.prototype, "onfoo") throws trying to read the property
      assert.isTrue(
        Object.prototype.hasOwnProperty.call(cls.prototype, "onfoo"),
      );
    });
    test("default value must be null", () => {
      const elt = document.createElement("test-handler");
      assert.isNull(elt.onfoo);
    });
    test("content attribute must be compiled to a function as the corresponding property", () => {
      const elt = document.createElement("test-handler");
      elt.setAttribute("onfoo", "window.onfooHappened = true");
      const compiledHandler = elt.onfoo;

      assert.isFunction(
        compiledHandler,
        "The onfoo property must be a function",
      );
      compiledHandler();
      assert.isTrue(
        window.onfooHappened,
        "Calling the handler must run the code",
      );
    });
    test("content attribute must execute when an event is dispatched", () => {
      const elt = document.createElement("test-handler");
      elt.setAttribute("onfoo", "window.onfooHappened2 = true");

      elt.dispatchEvent(new Event("foo"));

      assert.isTrue(
        window.onfooHappened2,
        "Dispatching an event must run the code",
      );
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/event-handler-handleEvent-ignored.html
    suite("handleEvent ignored", () => {
      test("plain object", () => {
        const elt = document.createElement("test-handler");
        elt.onfoo = Object.create(null, {
          handleEvent: {
            get() {
              assert.fail('"handleEvent" should not be looked up');
              return null;
            },
          },
        });
        elt.dispatchEvent(new Event("foo"));
      });
      test("non-callable that is instance of Function", () => {
        const elt = document.createElement("test-handler");
        elt.onfoo = Object.create(Function.prototype, {
          handleEvent: {
            get() {
              assert.fail('"handleEvent" should not be looked up');
              return null;
            },
          },
        });
        elt.dispatchEvent(new Event("foo"));
      });
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/event-handler-javascript.html
    test("event handlers starting with 'javascript:' should treat that as a label", () => {
      const elt = document.createElement("test-handler");
      elt.setAttribute(
        "onfoo",
        `javascript:
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          window.onfooHappenedI = i;
          window.onfooHappenedJ = j;
          break javascript;
        }
      }`,
      );
      elt.dispatchEvent(new Event("foo"));
      assert.strictEqual(window.onfooHappenedI, 0);
      assert.strictEqual(window.onfooHappenedJ, 0);
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/event-handler-processing-algorithm.html
    test("event handler added by property returning false cancels event", () => {
      const elt = document.createElement("test-handler");
      elt.onfoo = () => false;

      const evt = new Event("foo", { cancelable: true });
      elt.dispatchEvent(evt);
      assert.isTrue(evt.defaultPrevented);
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/event-handler-processing-algorithm-manual.html
    test("event handler added by property returning true does not cancel event", () => {
      const elt = document.createElement("test-handler");
      elt.onfoo = () => true;

      const evt = new Event("foo", { cancelable: true });
      elt.dispatchEvent(evt);
      assert.isFalse(evt.defaultPrevented);
    });
    test("event handler added by attribute returning false cancels event", () => {
      const elt = document.createElement("test-handler");
      elt.setAttribute("onfoo", "return false");

      const evt = new Event("foo", { cancelable: true });
      elt.dispatchEvent(evt);
      assert.isTrue(evt.defaultPrevented);
    });
    test("event handler added by attribute returning true does not cancel event", () => {
      const elt = document.createElement("test-handler");
      elt.setAttribute("onfoo", "return true");

      const evt = new Event("foo", { cancelable: true });
      elt.dispatchEvent(evt);
      assert.isFalse(evt.defaultPrevented);
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/event-handler-removal.window.js
    test("Event handler set through content attribute should be removed when they are set to null", () => {
      const uncalled = "throw new Error('should never be reached')";
      const elt = document.createElement("test-handler");
      let i = 0;
      elt.addEventListener("foo", () => assert.strictEqual(++i, 1));
      // event handler is activated here…
      elt.setAttribute("onfoo", uncalled);
      elt.addEventListener("foo", () => assert.strictEqual(++i, 2));
      // …but deactivated here…
      elt.onfoo = null;
      elt.addEventListener("foo", () => assert.strictEqual(++i, 3));
      // …and reactivated here
      elt.onfoo = () => assert.strictEqual(++i, 4);
      elt.addEventListener("foo", () => assert.strictEqual(++i, 5));

      elt.dispatchEvent(new Event("foo"));

      assert.strictEqual(elt.getAttribute("onfoo"), uncalled);
      assert.strictEqual(i, 5);
    });
    test("Event handler set through content attribute should be re-activated even if content is the same", () => {
      window.onfooHappened3 = 0;
      const script = "window.onfooHappened3++";
      const elt = document.createElement("test-handler");
      elt.setAttribute("onfoo", script); // event handler is activated here…
      elt.onfoo = null; // …but deactivated here…

      assert.strictEqual(elt.getAttribute("onfoo"), script);

      elt.setAttribute("onfoo", script); // and reactivated here

      elt.dispatchEvent(new Event("foo"));

      assert.strictEqual(window.onfooHappened3, 1);
    });
    test("Event handler set through content attribute should be deactivated when the content attribute is removed", () => {
      const uncalled = "throw new Error('should never be reached')";
      const elt = document.createElement("test-handler");
      let i = 0;
      elt.addEventListener("foo", () => assert.strictEqual(++i, 1));
      // event handler is activated here…
      elt.setAttribute("onfoo", uncalled);
      elt.addEventListener("foo", () => assert.strictEqual(++i, 2));
      // …but deactivated here…
      elt.removeAttribute("onfoo");
      elt.addEventListener("foo", () => assert.strictEqual(++i, 3));
      // …and reactivated here
      elt.onfoo = () => assert.strictEqual(++i, 4);
      elt.addEventListener("foo", () => assert.strictEqual(++i, 5));

      elt.dispatchEvent(new Event("foo"));

      assert.strictEqual(i, 5);
    });
    test("Event handler set through IDL should be deactivated when the IDL attribute is set to null", () => {
      const elt = document.createElement("test-handler");
      let i = 0;
      elt.addEventListener("foo", () => assert.strictEqual(++i, 1));
      // event handler is activated here…
      elt.onfoo = () => assert.fail("should never be called");
      elt.addEventListener("foo", () => assert.strictEqual(++i, 2));
      // …but deactivated here…
      elt.onfoo = null;
      elt.addEventListener("foo", () => assert.strictEqual(++i, 3));
      // …and reactivated here
      elt.onfoo = () => assert.strictEqual(++i, 4);
      elt.addEventListener("foo", () => assert.strictEqual(++i, 5));

      elt.dispatchEvent(new Event("foo"));

      assert.strictEqual(i, 5);
    });
    test("Event handler set through IDL should NOT be deactivated when the content attribute is removed", () => {
      const elt = document.createElement("test-handler");
      let i = 0;
      elt.addEventListener("foo", () => assert.strictEqual(++i, 1));
      // event handler is activated here…
      elt.onfoo = () => assert.fail("should never be called");
      elt.addEventListener("foo", () => assert.strictEqual(++i, 3));
      // …and NOT deactivated here
      elt.removeAttribute("onfoo");
      elt.addEventListener("foo", () => assert.strictEqual(++i, 4));
      elt.onfoo = () => assert.strictEqual(++i, 2);
      elt.addEventListener("foo", () => assert.strictEqual(++i, 5));

      elt.dispatchEvent(new Event("foo"));

      assert.strictEqual(i, 5);
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/event-handler-sourcetext.html
    test("sourceText", () => {
      const elt = document.createElement("test-handler");
      elt.setAttribute("onfoo", "bar");
      assert.strictEqual(
        elt.onfoo.toString(),
        "function onfoo(event) {\nbar\n}",
      );
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/event-handler-spec-example.window.js
    for (const object of [{}, function () {}, new Number(42), new String()]) {
      test(`Event handler listeners should be registered when they are first set to an object value (${object})`, () => {
        const uncalled = "throw new Error('should never be reached')";
        const elt = document.createElement("test-handler");
        let i = 0;
        elt.onfoo = object; // event handler is registered here

        assert.strictEqual(elt.onfoo, object);

        elt.addEventListener("foo", () => assert.strictEqual(++i, 2));
        elt.setAttribute("onfoo", uncalled);
        elt.addEventListener("foo", () => assert.strictEqual(++i, 3));
        elt.onfoo = () => assert.strictEqual(++i, 1);
        elt.addEventListener("foo", () => assert.strictEqual(++i, 4));

        elt.dispatchEvent(new Event("foo"));

        assert.strictEqual(elt.getAttribute("onfoo"), uncalled);
        assert.strictEqual(i, 4);
      });
    }
    for (const primitive of [42, null, undefined, ""]) {
      test(`Event handler listeners should be registered when they are first set to an object value (${JSON.stringify(primitive)})`, () => {
        const uncalled = "throw new Error('should never be reached')";
        const elt = document.createElement("test-handler");
        let i = 0;
        elt.onfoo = primitive;

        assert.isNull(elt.onfoo);

        elt.addEventListener("foo", () => assert.strictEqual(++i, 1));
        elt.setAttribute("onfoo", uncalled); //event handler is registered here
        elt.addEventListener("foo", () => assert.strictEqual(++i, 3));
        elt.onfoo = () => assert.strictEqual(++i, 2);
        elt.addEventListener("foo", () => assert.strictEqual(++i, 4));

        elt.dispatchEvent(new Event("foo"));

        assert.strictEqual(elt.getAttribute("onfoo"), uncalled);
        assert.strictEqual(i, 4);
      });
    }
    test("Event handler listeners should be registered when they are first set to an object value", () => {
      const uncalled = "throw new Error('should never be reached')";
      const elt = document.createElement("test-handler");
      let i = 0;
      elt.addEventListener("foo", () => assert.strictEqual(++i, 1));
      elt.setAttribute("onfoo", uncalled); //event handler is registered here
      elt.addEventListener("foo", () => assert.strictEqual(++i, 3));
      elt.onfoo = () => assert.strictEqual(++i, 2);
      elt.addEventListener("foo", () => assert.strictEqual(++i, 4));

      elt.dispatchEvent(new Event("foo"));

      assert.strictEqual(elt.getAttribute("onfoo"), uncalled);
      assert.strictEqual(i, 4);
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/inline-event-handler-ordering.html
    test("Inline event handlers retain their ordering when invalid and force-compiled", () => {
      mocha.options.allowUncaught = true;
      const elt = document.createElement("test-handler");
      window.events = [];
      elt.addEventListener("foo", () => window.events.push("ONE"));
      elt.setAttribute("onfoo", "window.open("); // note the parse error!
      elt.addEventListener("foo", () => window.events.push("THREE"));

      expectGlobalError(() => {
        // Try to compile the event handler
        elt.onfoo;
      });

      elt.setAttribute("onfoo", "events.push('TWO')");

      elt.dispatchEvent(new Event("foo"));

      assert.deepStrictEqual(window.events, ["ONE", "TWO", "THREE"]);
    });
    test("Inline event handlers retain their ordering when invalid and force-compiled via dispatch", () => {
      const elt = document.createElement("test-handler");
      window.events = [];
      elt.addEventListener("foo", () => window.events.push("ONE"));
      elt.setAttribute("onfoo", "window.open("); // note the parse error!
      elt.addEventListener("foo", () => window.events.push("THREE"));
      expectGlobalError(() => {
        elt.dispatchEvent(new Event("foo"));
      });
      elt.setAttribute("onfoo", "events.push('TWO')");
      elt.dispatchEvent(new Event("foo"));
      assert.deepStrictEqual(window.events, [
        "ONE",
        "THREE",
        "ONE",
        "TWO",
        "THREE",
      ]);
    });
    test("Inline event handlers retain their ordering when invalid and lazy-compiled", () => {
      const elt = document.createElement("test-handler");
      window.events = [];
      elt.addEventListener("foo", () => window.events.push("ONE"));
      elt.setAttribute("onfoo", "window.open("); // note the parse error!
      elt.addEventListener("foo", () => window.events.push("THREE"));
      elt.setAttribute("onfoo", "events.push('TWO')");
      elt.dispatchEvent(new Event("foo"));
      assert.deepStrictEqual(window.events, ["ONE", "TWO", "THREE"]);
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/invalid-uncompiled-raw-handler-compiled-late.window.js
    test("Invalid uncompiled raw handlers should only be compiled when about to call them", () => {
      const events = [];
      const elt = document.createElement("test-handler");
      elt.addEventListener("foo", () => events.push("foo 1"));
      elt.setAttribute("onfoo", "}");
      elt.addEventListener("foo", () => events.push("foo 2"));
      expectGlobalError(() => {
        window.onerror = () => {
          events.push("error");
        };
        elt.dispatchEvent(new Event("foo"));
      });
      assert.deepStrictEqual(events, ["foo 1", "error", "foo 2"]);
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/invalid-uncompiled-raw-handler-compiled-once.window.js
    test("Invalid uncompiled raw handlers should only be compiled once", () => {
      let errors = 0;
      const elt = document.createElement("test-handler");
      elt.setAttribute("onfoo", "window.open(");
      expectGlobalError(() => {
        window.onerror = () => {
          errors++;
        };
        assert.isNull(elt.onfoo);
        assert.isNull(elt.onfoo);
      });
      assert.strictEqual(errors, 1);
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/invalid-uncompiled-raw-handler-keeps-position.window.js
    test("Compiling invalid uncompiled raw handlers should keep the position in event listener list", () => {
      let events = [];
      const elt = document.createElement("test-handler");
      elt.addEventListener("foo", () => events.push("foo 1"));
      elt.setAttribute("onfoo", "}");
      elt.addEventListener("foo", () => events.push("foo 3"));
      expectGlobalError(() => {
        window.onerror = () => {
          events.push("error");
        };
        assert.isNull(elt.onfoo);
      });
      assert.deepStrictEqual(events, ["error"]);

      events = [];
      elt.onfoo = () => events.push("foo 2");
      elt.dispatchEvent(new Event("foo"));
      assert.deepStrictEqual(events, ["foo 1", "foo 2", "foo 3"]);
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/compile-event-handler-lexical-scopes.html
    suite("lexical scopes", () => {
      test("The EventHandler is an element's event handler and has no form owner", () => {
        const target_element = document.createElement("test-handler");
        const inner_element = document.createElement("img");
        const outer_element = document.createElement("fieldset");
        outer_element.append(target_element);
        target_element.append(inner_element);
        target_element.setAttribute(
          "onfoo",
          `
          window.testResults.complete = typeof(complete);
          window.testResults.tagName = tagName;
          window.testResults.disabled = typeof(disabled);
          window.testResults.domain = typeof(domain);
          window.testResults.print = typeof(print);
          window.testResults.testResults = typeof(testResults);
          window.testResults.target_own_property = typeof(target_own_property);
          window.testResults.inner_own_property = typeof(inner_own_property);
          window.testResults.outer_own_property = typeof(outer_own_property);
          window.testResults.event = typeof(event);
          `,
        );

        target_element.target_own_property = {};
        inner_element.inner_own_property = {};
        outer_element.outer_own_property = {};

        document.body.append(outer_element);
        try {
          const results = (window.testResults = {});
          // Dispatching on an inner element such that event.target != event.currentTarget
          inner_element.dispatchEvent(
            new Event("foo", {
              bubbles: true,
            }),
          );

          // Expected scopes are: |target_element|, document, and window.
          assert.strictEqual(
            results.complete,
            "undefined",
            "HTMLImageElement.prototype.complete",
          );
          assert.strictEqual(
            results.tagName,
            "TEST-HANDLER",
            "HTMLElement.prototype.tagName",
          );
          assert.strictEqual(
            results.disabled,
            "undefined",
            "HTMLFieldSetElement.prototype.disabled",
          );
          assert.strictEqual(
            results.domain,
            "string",
            "Document.prototype.domain",
          );
          assert.strictEqual(results.print, "function", "window.print");
          assert.strictEqual(results.testResults, "object");
          assert.strictEqual(results.target_own_property, "object");
          assert.strictEqual(results.inner_own_property, "undefined");
          assert.strictEqual(results.outer_own_property, "undefined");
          assert.strictEqual(
            results.event,
            "object",
            "The argument of event handler",
          );
        } finally {
          outer_element.remove();
        }
      });
      test("The EventHandler is an element's event handler and has a form owner", () => {
        const target_element = document.createElement("x-foo");
        const inner_element = document.createElement("q");
        const form_owner_element = document.createElement("form");
        form_owner_element.append(target_element);
        target_element.append(inner_element);
        form_owner_element.onsubmit = () => false;
        target_element.setAttribute(
          "onfoo",
          `
          window.testResults.cite = typeof(cite);
          window.testResults.tagName = tagName;
          window.testResults.form = typeof(form);
          window.testResults.encoding = typeof(encoding);
          window.testResults.domain = typeof(domain);
          window.testResults.print = typeof(print);
          window.testResults.testResults = typeof(testResults);
          window.testResults.target_own_property = typeof(target_own_property);
          window.testResults.inner_own_property = typeof(inner_own_property);
          window.testResults.form_owner_own_property = typeof(form_owner_own_property);
          window.testResults.event = typeof(event);
          `,
        );

        target_element.target_own_property = {};
        inner_element.inner_own_property = {};
        form_owner_element.form_owner_own_property = {};

        document.body.append(form_owner_element);
        try {
          const results = (window.testResults = {});
          // Dispatching on an inner element such that event.target != event.currentTarget
          inner_element.dispatchEvent(
            new Event("foo", {
              bubbles: true,
            }),
          );

          // Expected scopes are: |target_element|, document, and window.
          assert.strictEqual(
            results.cite,
            "undefined",
            "HTMLQuoteElement.prototype.cite",
          );
          assert.strictEqual(
            results.tagName,
            "X-FOO",
            "HTMLElement.prototype.tagName",
          );
          assert.strictEqual(
            results.form,
            "object",
            "x-foo form-associated form",
          );
          assert.strictEqual(
            results.encoding,
            "string",
            "HTMLFormElement.prototype.encoding",
          );
          assert.strictEqual(
            results.domain,
            "string",
            "Document.prototype.domain",
          );
          assert.strictEqual(results.print, "function", "window.print");
          assert.strictEqual(results.testResults, "object");
          assert.strictEqual(results.target_own_property, "object");
          assert.strictEqual(results.inner_own_property, "undefined");
          assert.strictEqual(results.form_owner_own_property, "object");
          assert.strictEqual(
            results.event,
            "object",
            "The argument of event handler",
          );
        } finally {
          form_owner_element.remove();
        }
      });
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/compile-event-handler-lexical-scopes-form-owner.html
    test("form-associated <x-foo> has a form owner", () => {
      document.body.insertAdjacentHTML(
        "beforeend",
        `
        <form id=form>
          <x-foo onfoo="window.xFooOnFooElements = elements;"></x-foo>
        </form>`,
      );
      const form = document.querySelector("#form");
      try {
        const elt = form.querySelector("x-foo");
        elt.dispatchEvent(new Event("foo"));
        assert.strictEqual(window.xFooOnFooElements, form.elements);
      } finally {
        document.querySelector("#form").remove();
      }
    });
    // https://github.com/web-platform-tests/wpt/blob/73d6bd0d61f0ad5341d0c2303a7638e3aa12a594/html/webappapis/scripting/events/compile-event-handler-symbol-unscopables.html
    suite("Inline event handler scopes exclude unscopable properties", () => {
      window.testVariable = {};

      test("unscopable `document.testVariable` doesn't shadow `window.testVariable`", () => {
        const elt = document.createElement("test-handler");
        elt.setAttribute(
          "onfoo",
          `
          "use strict";

          window.testResults.testVariable = testVariable;
          `,
        );

        const results = (window.testResults = {});

        document[Symbol.unscopables].testVariable = true;
        document.testVariable = "FAIL (document)";

        elt.dispatchEvent(new Event("foo"));
        assert.strictEqual(results.testVariable, window.testVariable);
      });
      test("unscopable `element.testVariable` doesn't shadow `window.testVariable`", () => {
        const elt = document.createElement("test-handler");
        elt.setAttribute(
          "onfoo",
          `
          "use strict";

          window.testResults.testVariable = testVariable;
          `,
        );

        const results = (window.testResults = {});

        elt[Symbol.unscopables].testVariable = true;
        elt.testVariable = "FAIL (document)";

        elt.dispatchEvent(new Event("foo"));
        assert.strictEqual(results.testVariable, window.testVariable);
      });
      test("unscopable `formOwner.testVariable` doesn't shadow `window.testVariable`", () => {
        const elt = document.createElement("test-handler");
        elt.setAttribute(
          "onfoo",
          `
          "use strict";

          window.testResults.testVariable = testVariable;
          `,
        );
        const formOwner = document.createElement("form");
        formOwner.onsubmit = () => false;
        formOwner.append(elt);

        const results = (window.testResults = {});

        formOwner[Symbol.unscopables].testVariable = true;
        formOwner.testVariable = "FAIL (document)";

        elt.dispatchEvent(new Event("foo"));
        assert.strictEqual(results.testVariable, window.testVariable);
      });
    });
    // TODO: CSP
    // https://github.com/web-platform-tests/wpt/tree/master/content-security-policy/script-src-attr-elem
    // https://github.com/web-platform-tests/wpt/tree/master/content-security-policy/script-src
    test("Implementation mustn't leak between elements", () => {
      let called = 0;
      const onfoo = () => {
        called++;
      };

      const elt1 = document.createElement("test-handler");
      elt1.onfoo = onfoo;

      const elt2 = document.createElement("test-handler");

      // elt2 modifying elt1
      assert.strictEqual(
        elt1.onfoo,
        onfoo,
        "creating a second element shouldn't affect the first one",
      );

      elt2.onfoo = () => true;
      assert.strictEqual(
        elt1.onfoo,
        onfoo,
        "assigning elt2.onfoo shouldn't update elt1.onfoo",
      );

      elt1.dispatchEvent(new Event("foo"));
      assert.strictEqual(called, 1);

      elt2.dispatchEvent(new Event("foo"));
      assert.strictEqual(called, 1);

      elt2.setAttribute("onfoo", "return true");
      assert.strictEqual(
        elt1.onfoo,
        onfoo,
        "setting elt2's onfoo attribute shouldn't update elt1.onfoo",
      );

      elt2.onfoo = null;
      assert.strictEqual(
        elt1.onfoo,
        onfoo,
        "assigning elt2.onfoo shouldn't update elt1.onfoo",
      );

      // elt1 modifying elt2
      elt2.onfoo = onfoo;

      elt1.onfoo = () => true;
      assert.strictEqual(
        elt2.onfoo,
        onfoo,
        "assigning elt1.onfoo shouldn't update elt2.onfoo",
      );

      elt2.dispatchEvent(new Event("foo"));
      assert.strictEqual(called, 2);

      elt1.dispatchEvent(new Event("foo"));
      assert.strictEqual(called, 2);

      elt1.setAttribute("onfoo", "return true");
      assert.strictEqual(
        elt2.onfoo,
        onfoo,
        "setting elt1's onfoo attribute shouldn't update elt2.onfoo",
      );

      elt1.onfoo = null;
      assert.strictEqual(
        elt2.onfoo,
        onfoo,
        "assigning elt1.onfoo shouldn't update elt2.onfoo",
      );
    });
  });
}
