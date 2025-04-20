import { assert } from "chai";

function assert_equals(actual, expected, description) {
  assert.strictEqual(actual, expected, description);
}
function assert_throws_js(errorType, fn) {
  assert.throws(fn, errorType);
}
function assert_throws_dom(type, fn) {
  try {
    fn();
  } catch (e) {
    assert.instanceOf(e, DOMException);
    assert.strictEqual(e.name, type);
    return;
  }
  assert.fail("should have thrown an exception");
}

// Inspired by https://github.com/web-platform-tests/wpt/blob/0eb7694e58ce18fa3a1b130e4fe3fe65f2b3627c/dom/nodes/Element-classlist.html

function setTest(e, newVal) {
  if (newVal === null) {
    e.removeAttribute("test");
  } else {
    e.setAttribute("test", newVal);
  }
}

function checkModification(e, funcName, args, expectedRes, before, after,
                           expectedException) {
  if (!Array.isArray(args)) {
    args = [args];
  }

  test("test." + funcName + "(" + args.map(v => JSON.stringify(v)).join(", ") +
      ") with attribute value " + JSON.stringify(before), () => {
    var shouldThrow = typeof(expectedException) === "string";
    if (shouldThrow) {
      // If an exception is thrown, the test attribute shouldn't change.
      after = before;
    }
    setTest(e, before);

    var obs;
    // If we have MutationObservers available,  do some checks to make
    // sure attribute sets are happening at sane times.
    if (self.MutationObserver) {
      obs = new MutationObserver(() => {});
      obs.observe(e, { attributes: true });
    }
    if (shouldThrow) {
      assert_throws_dom(expectedException, function() {
        var list = e.test;
        // eslint-disable-next-line no-unused-vars
        var res = list[funcName].apply(list, args);
      });
    } else {
      var list = e.test;
      var res = list[funcName].apply(list, args);
    }
    if (obs) {
      var mutationRecords = obs.takeRecords();
      obs.disconnect();
      if (shouldThrow) {
        assert_equals(mutationRecords.length, 0,
                      "There should have been no mutation");
      } else if (funcName == "replace") {
        assert_equals(mutationRecords.length == 1,
                      expectedRes,
                      "Should have a mutation exactly when replace() returns true");
      } else {
        // For other functions, would need to check when exactly
        // mutations are supposed to happen.
      }
    }
    if (!shouldThrow) {
      assert_equals(res, expectedRes, "wrong return value");
    }

    var expectedAfter = after;

    assert_equals(e.getAttribute("test"), expectedAfter,
                  "wrong test after modification");
  });
}

export function reflectDOMTokenList(elementName, hasSupportedTokens = false) {
  test("Assigning to the property", () => {
    const e = document.createElement(elementName);
    var expect = e.test;
    e.test = "foo";
    assert_equals(e.test, expect,
                  "test should be unchanged after assignment");
  });
  if (!hasSupportedTokens) {
    test(".supports() must throw TypeError", () => {
      const e = document.createElement(elementName);
      assert_throws_js(TypeError, function() {
        e.test.supports("a");
      });
    });
  } else {
    test("supports() method", () => {
      const e = document.createElement(elementName);
      assert.isTrue(e.test.supports("one"));
      assert.isTrue(e.test.supports("two"));
      assert.isTrue(e.test.supports("three"));
      assert.isTrue(e.test.supports("ONE"));
      assert.isTrue(e.test.supports("One"));
      assert.isTrue(e.test.supports("oNe"));
      assert.isTrue(e.test.supports("one"));
      assert.isFalse(e.test.supports("a"));
    });
  }
  suite("length attribute", () => {
    const e = document.createElement(elementName);
    function checkLength(value, length) {
      test("test.length when " +
          (value === null ? "removed" : "set to " + JSON.stringify(value)), () => {
        setTest(e, value);
        assert_equals(e.test.length, length);
      });
    }
  
    checkLength(null, 0);
    checkLength("", 0);
    checkLength("   \t  \f", 0);
    checkLength("a", 1);
    checkLength("a A", 2);
    checkLength("\r\na\t\f", 1);
    checkLength("a a", 1);
    checkLength("a a a a a a", 1);
    checkLength("a a b b", 2);
    checkLength("a A B b", 4);
    checkLength("a b c c b a a b c c", 3);
    checkLength("   a  a b", 2);
    checkLength("a\tb\nc\fd\re f", 6);
  });
  suite("[Stringifies]", () => {
    const e = document.createElement(elementName);
    function checkStringifier(value, expected) {
      test("test.toString() when " +
          (value === null ? "removed" : "set to " + JSON.stringify(value)), () => {
        setTest(e, value);
        assert_equals(e.test.toString(), expected);
      });
    }
  
    checkStringifier(null, "");
    checkStringifier("foo", "foo");
    checkStringifier("   a  a b", "   a  a b");
  });
  suite("item() method", () => {
    const e = document.createElement(elementName);
    function checkItems(attributeValue, expectedValues) {
      function checkItemFunction(index, expected) {
        assert_equals(e.test.item(index), expected,
                      "test.item(" + index + ")");
      }
  
      function checkItemArray(index, expected) {
        assert_equals(e.test[index], expected, "test[" + index + "]");
      }
  
      test("test.item() when set to " + JSON.stringify(attributeValue), () => {
        setTest(e, attributeValue);

        checkItemFunction(-1, null);
        checkItemArray(-1, undefined);

        var i = 0;
        while (i < expectedValues.length) {
          checkItemFunction(i, expectedValues[i]);
          checkItemArray(i, expectedValues[i]);
          i++;
        }

        checkItemFunction(i, null);
        checkItemArray(i, undefined);
  
        checkItemFunction(0xffffffff, null);
        checkItemArray(0xffffffff, undefined);

        checkItemFunction(0xfffffffe, null);
        checkItemArray(0xfffffffe, undefined);
      });
    }
  
    checkItems(null, []);
    checkItems("a", ["a"]);
    checkItems("aa AA aa", ["aa", "AA"]);
    checkItems("a b", ["a", "b"]);
    checkItems("   a  a b", ["a", "b"]);
    checkItems("\t\n\f\r a\t\n\f\r b\t\n\f\r ", ["a", "b"]);
  });
  suite("contains() method", () => {
    function checkContains(attributeValue, args, expectedRes) {
      if (!Array.isArray(expectedRes)) {
        expectedRes = Array(args.length).fill(expectedRes);
      }
      suite("when set to " + JSON.stringify(attributeValue), () => {
        const e = document.createElement(elementName);
        setTest(e, attributeValue);
        for (var i = 0; i < args.length; i++) {
          const arg = args[i];
          const expected = expectedRes[i];
          test("test.contains(" + JSON.stringify(arg) + ")", () => {
            assert_equals(e.test.contains(arg), expected,
                          "test.contains(\"" + arg + "\")");
          });
        }
      });
    }
  
    checkContains(null, ["a", "", "  "], false);
    checkContains("", ["a"], false);
  
    checkContains("a", ["a"], true);
    // eslint-disable-next-line no-sparse-arrays
    checkContains("a", ["aa", "b", "A", "a.", "a)",, "a'", 'a"', "a$", "a~",
                        "a?", "a\\"], false);
  
    // All "ASCII whitespace" per spec, before and after
    checkContains("a", ["a\t", "\ta", "a\n", "\na", "a\f", "\fa", "a\r", "\ra",
                        "a ", " a"], false);
  
    checkContains("aa AA", ["aa", "AA", "aA"], [true, true, false]);
    checkContains("a a a", ["a", "aa", "b"], [true, false, false]);
    checkContains("a b c", ["a", "b"], true);
  
    checkContains("null undefined", [null, undefined], true);
    checkContains("\t\n\f\r a\t\n\f\r b\t\n\f\r ", ["a", "b"], true);
  });
  suite("add() method", () => {
    const e = document.createElement(elementName);
    function checkAdd(before, argument, after, param) {
      var expectedException = undefined;
      var noop = false;
      if (param == "noop") {
        noop = true;
      } else {
        expectedException = param;
      }
      checkModification(e, "add", argument, undefined, before, after,
                        expectedException);
      // Also check force toggle.  The only difference is that it doesn't run the
      // update steps for a no-op.
      if (!Array.isArray(argument)) {
        checkModification(e, "toggle", [argument, true], true, before,
                          noop ? before : after, expectedException);
      }
    }
  
    checkAdd(null, "", null, "SyntaxError");
    checkAdd(null, ["a", ""], null, "SyntaxError");
    checkAdd(null, " ", null, "InvalidCharacterError");
    checkAdd(null, "\ta", null, "InvalidCharacterError");
    checkAdd(null, "a\t", null, "InvalidCharacterError");
    checkAdd(null, "\na", null, "InvalidCharacterError");
    checkAdd(null, "a\n", null, "InvalidCharacterError");
    checkAdd(null, "\fa", null, "InvalidCharacterError");
    checkAdd(null, "a\f", null, "InvalidCharacterError");
    checkAdd(null, "\ra", null, "InvalidCharacterError");
    checkAdd(null, "a\r", null, "InvalidCharacterError");
    checkAdd(null, " a", null, "InvalidCharacterError");
    checkAdd(null, "a ", null, "InvalidCharacterError");
    checkAdd(null, ["a", " "], null, "InvalidCharacterError");
    checkAdd(null, ["a", "aa "], null, "InvalidCharacterError");
  
    checkAdd("a", "a", "a");
    checkAdd("aa", "AA", "aa AA");
    checkAdd("a b c", "a", "a b c");
    checkAdd("a a a  b", "a", "a b", "noop");
    checkAdd(null, "a", "a");
    checkAdd("", "a", "a");
    checkAdd(" ", "a", "a");
    checkAdd("   \f", "a", "a");
    checkAdd("a", "b", "a b");
    checkAdd("a b c", "d", "a b c d");
    checkAdd("a b c ", "d", "a b c d");
    checkAdd("   a  a b", "c", "a b c");
    checkAdd("   a  a b", "a", "a b", "noop");
    checkAdd("\t\n\f\r a\t\n\f\r b\t\n\f\r ", "c", "a b c");
  
    // multiple add
    checkAdd("a b c ", ["d", "e"], "a b c d e");
    checkAdd("a b c ", ["a", "a"], "a b c");
    checkAdd("a b c ", ["d", "d"], "a b c d");
    checkAdd("a b c a ", [], "a b c");
    checkAdd(null, ["a", "b"], "a b");
    checkAdd("", ["a", "b"], "a b");
  
    checkAdd(null, null, "null");
    checkAdd(null, undefined, "undefined");
  });
  suite("remove() method", () => {
    const e= document.createElement(elementName);
    function checkRemove(before, argument, after, param) {
      var expectedException = undefined;
      var noop = false;
      if (param == "noop") {
        noop = true;
      } else {
        expectedException = param;
      }
      checkModification(e, "remove", argument, undefined, before, after,
                        expectedException);
      // Also check force toggle.  The only difference is that it doesn't run the
      // update steps for a no-op.
      if (!Array.isArray(argument)) {
        checkModification(e, "toggle", [argument, false], false, before,
                          noop ? before : after, expectedException);
      }
    }
  
    checkRemove(null, "", null, "SyntaxError");
    checkRemove(null, " ", null, "InvalidCharacterError");
    checkRemove("\ta", "\ta", "\ta", "InvalidCharacterError");
    checkRemove("a\t", "a\t", "a\t", "InvalidCharacterError");
    checkRemove("\na", "\na", "\na", "InvalidCharacterError");
    checkRemove("a\n", "a\n", "a\n", "InvalidCharacterError");
    checkRemove("\fa", "\fa", "\fa", "InvalidCharacterError");
    checkRemove("a\f", "a\f", "a\f", "InvalidCharacterError");
    checkRemove("\ra", "\ra", "\ra", "InvalidCharacterError");
    checkRemove("a\r", "a\r", "a\r", "InvalidCharacterError");
    checkRemove(" a", " a", " a", "InvalidCharacterError");
    checkRemove("a ", "a ", "a ", "InvalidCharacterError");
    checkRemove("aa ", "aa ", null, "InvalidCharacterError");
  
    checkRemove(null, "a", null);
    checkRemove("", "a", "");
    checkRemove("a b  c", "d", "a b c", "noop");
    checkRemove("a b  c", "A", "a b c", "noop");
    checkRemove(" a a a ", "a", "");
    checkRemove("a  b", "a", "b");
    checkRemove("a  b  ", "a", "b");
    checkRemove("a a b", "a", "b");
    checkRemove("aa aa bb", "aa", "bb");
    checkRemove("a a b a a c a a", "a", "b c");
  
    checkRemove("a  b  c", "b", "a c");
    checkRemove("aaa  bbb  ccc", "bbb", "aaa ccc");
    checkRemove(" a  b  c ", "b", "a c");
    checkRemove("a b b b c", "b", "a c");
  
    checkRemove("a  b  c", "c", "a b");
    checkRemove(" a  b  c ", "c", "a b");
    checkRemove("a b c c c", "c", "a b");
  
    checkRemove("a b a c a d a", "a", "b c d");
    checkRemove("AA BB aa CC AA dd aa", "AA", "BB aa CC dd");
  
    checkRemove("\ra\na\ta\f", "a", "");
    checkRemove("\t\n\f\r a\t\n\f\r b\t\n\f\r ", "a", "b");
  
    // multiple remove
    checkRemove("a b c ", ["d", "e"], "a b c");
    checkRemove("a b c ", ["a", "b"], "c");
    checkRemove("a b c ", ["a", "c"], "b");
    checkRemove("a b c ", ["a", "a"], "b c");
    checkRemove("a b c ", ["d", "d"], "a b c");
    checkRemove("a b c ", [], "a b c");
    checkRemove(null, ["a", "b"], null);
    checkRemove("", ["a", "b"], "");
    checkRemove("a a", [], "a");
  
    checkRemove("null", null, "");
    checkRemove("undefined", undefined, "");
  });
  suite("toggle() method", () => {
    const e = document.createElement(elementName);
    function checkToggle(before, argument, expectedRes, after, expectedException) {
      checkModification(e, "toggle", argument, expectedRes, before, after,
                        expectedException);
    }
  
    checkToggle(null, "", null, null, "SyntaxError");
    checkToggle(null, "aa ", null, null, "InvalidCharacterError");
  
    checkToggle(null, "a", true, "a");
    checkToggle("", "a", true, "a");
    checkToggle(" ", "a", true, "a");
    checkToggle("   \f", "a", true, "a");
    checkToggle("a", "b", true, "a b");
    checkToggle("a", "A", true, "a A");
    checkToggle("a b c", "d", true, "a b c d");
    checkToggle("   a  a b", "d", true, "a b d");
  
    checkToggle("a", "a", false, "");
    checkToggle(" a a a ", "a", false, "");
    checkToggle(" A A A ", "a", true, "A a");
    checkToggle(" a b c ", "b", false, "a c");
    checkToggle(" a b c b b", "b", false, "a c");
    checkToggle(" a b  c  ", "c", false, "a b");
    checkToggle(" a b c ", "a", false, "b c");
    checkToggle("   a  a b", "b", false, "a");
    checkToggle("\t\n\f\r a\t\n\f\r b\t\n\f\r ", "a", false, "b");
    checkToggle("\t\n\f\r a\t\n\f\r b\t\n\f\r ", "c", true, "a b c");
  
    checkToggle("null", null, false, "");
    checkToggle("", null, true, "null");
    checkToggle("undefined", undefined, false, "");
    checkToggle("", undefined, true, "undefined");
  });
  suite("replace() method", () => {
    const e= document.createElement(elementName);
    function checkReplace(before, token, newToken, expectedRes, after, expectedException) {
      checkModification(e, "replace", [token, newToken], expectedRes, before,
                        after, expectedException);
    }
  
    checkReplace(null, "", "a", null, null, "SyntaxError");
    checkReplace(null, "", " ", null, null, "SyntaxError");
    checkReplace(null, " ", "a", null, null, "InvalidCharacterError");
    checkReplace(null, "\ta", "b", null, null, "InvalidCharacterError");
    checkReplace(null, "a\t", "b", null, null, "InvalidCharacterError");
    checkReplace(null, "\na", "b", null, null, "InvalidCharacterError");
    checkReplace(null, "a\n", "b", null, null, "InvalidCharacterError");
    checkReplace(null, "\fa", "b", null, null, "InvalidCharacterError");
    checkReplace(null, "a\f", "b", null, null, "InvalidCharacterError");
    checkReplace(null, "\ra", "b", null, null, "InvalidCharacterError");
    checkReplace(null, "a\r", "b", null, null, "InvalidCharacterError");
    checkReplace(null, " a", "b", null, null, "InvalidCharacterError");
    checkReplace(null, "a ", "b", null, null, "InvalidCharacterError");
  
    checkReplace(null, "a", "", null, null, "SyntaxError");
    checkReplace(null, " ", "", null, null, "SyntaxError");
    checkReplace(null, "a", " ", null, null, "InvalidCharacterError");
    checkReplace(null, "b", "\ta", null, null, "InvalidCharacterError");
    checkReplace(null, "b", "a\t", null, null, "InvalidCharacterError");
    checkReplace(null, "b", "\na", null, null, "InvalidCharacterError");
    checkReplace(null, "b", "a\n", null, null, "InvalidCharacterError");
    checkReplace(null, "b", "\fa", null, null, "InvalidCharacterError");
    checkReplace(null, "b", "a\f", null, null, "InvalidCharacterError");
    checkReplace(null, "b", "\ra", null, null, "InvalidCharacterError");
    checkReplace(null, "b", "a\r", null, null, "InvalidCharacterError");
    checkReplace(null, "b", " a", null, null, "InvalidCharacterError");
    checkReplace(null, "b", "a ", null, null, "InvalidCharacterError");
  
    checkReplace("a", "a", "a", true, "a");
    checkReplace("a", "a", "b", true, "b");
    checkReplace("a", "A", "b", false, "a");
    checkReplace("a b", "b", "A", true, "a A");
    checkReplace("a b", "c", "a", false, "a b");
    checkReplace("a b c", "d", "e", false, "a b c");
    // https://github.com/whatwg/dom/issues/443
    checkReplace("a a a  b", "a", "a", true, "a b");
    checkReplace("a a a  b", "c", "d", false, "a a a  b");
    checkReplace(null, "a", "b", false, null);
    checkReplace("", "a", "b", false, "");
    checkReplace(" ", "a", "b", false, " ");
    checkReplace(" a  \f", "a", "b", true, "b");
    checkReplace("a b c", "b", "d", true, "a d c");
    checkReplace("a b c", "c", "a", true, "a b");
    checkReplace("c b a", "c", "a", true, "a b");
    checkReplace("a b a", "a", "c", true, "c b");
    checkReplace("a b a", "b", "c", true, "a c");
    checkReplace("   a  a b", "a", "c", true, "c b");
    checkReplace("   a  a b", "b", "c", true, "a c");
    checkReplace("\t\n\f\r a\t\n\f\r b\t\n\f\r ", "a", "c", true, "c b");
    checkReplace("\t\n\f\r a\t\n\f\r b\t\n\f\r ", "b", "c", true, "a c");
  
    checkReplace("a null", null, "b", true, "a b");
    checkReplace("a b", "a", null, true, "null b");
    checkReplace("a undefined", undefined, "b", true, "a b");
    checkReplace("a b", "a", undefined, true, "undefined b");
  });
}
