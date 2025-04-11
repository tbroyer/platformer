import { assert } from "chai";

export class TestReferenceTargetElement extends HTMLElement {}
customElements.define("test-reference-target", TestReferenceTargetElement);

// Let's get syntax-highlighting in editors (directly using String.raw as we're copying straight from from HTML)
const html = String.raw;

function setupTestContent(html) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const shadowRoot = container.attachShadow({ mode: "closed" });
  shadowRoot.innerHTML = html;
  const elements = Object.create(null);
  for (const element of shadowRoot.querySelectorAll('[id]')) {
    elements[element.id] = element;
  }
  suiteTeardown(() => {
    container.remove();
  });
  return [shadowRoot, elements];
}

function assert_equals(actual, expected, description) {
  assert.strictEqual(actual, expected, description);
}
function assert_array_equals(actual, expected, description) {
  assert.sameOrderedMembers(actual, expected, description);
}
function assert_true(value, description) {
  assert.isTrue(value, description);
}
function assert_false(value, description) {
  assert.isFalse(value, description);
}
function assert_throws_js(errorType, fn) {
  assert.throws(fn, errorType);
}

// Adapted from https://github.com/web-platform-tests/wpt/blob/6b105fe9035c980be1d4f8564d539d50d7441cfd/html/dom/aria-element-reflection.html

export function reflectElementReference(elementName, typed = false) {
  const targetReferenceElementName = typed ? "test-reference-target" : "div";

  suite("element reference reflection", () => {
    const [, { activedescendant, parentListbox, i1, i2 }] = setupTestContent(html`
  <${elementName} id="activedescendant" test="x"></${elementName}>

  <${elementName} id="parentListbox" role="listbox" test="i1">
    <${targetReferenceElementName} role="option" id="i1">Item 1</${targetReferenceElementName}>
    <${targetReferenceElementName} role="option" id="i2">Item 2</${targetReferenceElementName}>
  </${elementName}>
    `);
  
    test("invalid ID for relationship returns null", () => {
      assert_equals(activedescendant.testElement, null,
        "invalid ID for relationship returns null");
    });

    test("Element reference should be set if the content attribute was included", () => {
      assert_equals(parentListbox.getAttribute("test"), "i1", "check content attribute after parsing.");
      assert_equals(parentListbox.testElement, i1, "check idl attribute after parsing.");
      assert_equals(parentListbox.testElement, parentListbox.testElement, "check idl attribute caching after parsing.");
    });

    test("If we set the content attribute, the element reference should reflect this", () => {
      parentListbox.setAttribute("test", "i2");
      assert_equals(parentListbox.testElement, i2, "setting the content attribute updates the element reference.");
      assert_equals(parentListbox.testElement, parentListbox.testElement, "check idl attribute caching after update.");
    });

    test("Setting the element reference should set the empty string in the content attribute", () => {
      parentListbox.testElement = i1;
      assert_equals(parentListbox.testElement, i1, "getter should return the right element reference.");
      assert_equals(parentListbox.getAttribute("test"), "", "content attribute should be empty.");
    });

    test("Both content and IDL attribute should be nullable", () => {
      parentListbox.testElement = null;
      assert_equals(parentListbox.testElement, null);
      assert_false(parentListbox.hasAttribute("test"));
      assert_equals(parentListbox.getAttribute("test"), null, "nullifying the idl attribute removes the content attribute.");
    });

    test("Setting content attribute to non-existent or non compatible element should nullify the IDL attribute", () => {
      // Reset the element to an existant one.
      parentListbox.setAttribute("test", "i1");
      assert_equals(parentListbox.testElement, i1, "reset attribute.");
  
      parentListbox.setAttribute("test", "non-existent-element");
      assert_equals(parentListbox.getAttribute("test"), "non-existent-element");
      assert_equals(parentListbox.testElement, null,"non-DOM content attribute should null the element reference");
    });
  });
  suite("If the content attribute is set directly, the IDL attribute getter always returns the first element whose ID matches the content attribute", () => {
    const [ root, { parentListbox2 } ] = setupTestContent(html`
  <${elementName} id="parentListbox2" role="listbox" test="option1">
    <${targetReferenceElementName} role="option" id="option1">Item 1</${targetReferenceElementName}>
    <${targetReferenceElementName} role="option" id="option2">Item 2</${targetReferenceElementName}>
  </${elementName}>
    `);

    test("If the content attribute is set directly, the IDL attribute getter always returns the first element whose ID matches the content attribute", () => {
      const option1 = root.getElementById("option1");
      const option2 = root.getElementById("option2");
      assert_equals(parentListbox2.testElement, option1);
      option1.removeAttribute("id");
      option2.setAttribute("id", "option1");
      const option2Duplicate = root.getElementById("option1");
      assert_equals(option2, option2Duplicate);
  
      assert_equals(parentListbox2.testElement, option2);
    });
  });
  suite("Setting the IDL attribute to an element which is not the first element in DOM order with its ID causes the content attribute to be an empty string", () => {
    const [, { blankIdParent } ] = setupTestContent(html`
  <${elementName} id="blankIdParent" role="listbox">
    <${targetReferenceElementName} role="option" id="multiple-id"></${targetReferenceElementName}>
    <${targetReferenceElementName} role="option" id="multiple-id"></${targetReferenceElementName}>
  </${elementName}>
    `);
    test("Setting the IDL attribute to an element which is not the first element in DOM order with its ID causes the content attribute to be an empty string", () => {
      // Get second child of parent. This violates the setting of a reflected element
      // as it will not be the first child of the parent with that ID, which should
      // result in an empty string for the content attribute.
      blankIdParent.testElement = blankIdParent.children[1];
      assert_true(blankIdParent.hasAttribute("test"));
      assert_equals(blankIdParent.getAttribute("test"), "");
      assert_equals(blankIdParent.testElement, blankIdParent.children[1]);
    })
  });
  suite("Setting an element reference that crosses into a shadow tree is disallowed, but setting one that is in a shadow inclusive ancestor is allowed.", () => {
    const [, { lightParagraph, lightParagraph2, shadowHost } ] = setupTestContent(html`
  <div id="outerContainer">
    <${elementName} id="lightParagraph">Hello world!</${elementName}>
    <${targetReferenceElementName} id="lightParagraph2">Hello world!</${targetReferenceElementName}>
    <span id="shadowHost">
    </span>
  </div>
    `);
    const shadow = shadowHost.attachShadow({mode: "open"});
    const link = document.createElement(elementName);
    const link2 = document.createElement(targetReferenceElementName);
    shadow.append(link, link2);
    test("Setting an element reference that crosses into a shadow tree is disallowed, but setting one that is in a shadow inclusive ancestor is allowed.", () => {
      // The given element crosses a shadow dom boundary, so it cannot be
      // set as an element reference.
      lightParagraph.testElement = link2;
      assert_equals(lightParagraph.testElement, null);

      // The given element crosses a shadow dom boundary (upwards), so
      // can be used as an element reference, but the content attribute
      // should reflect the empty string.
      link.testElement = lightParagraph2;
      assert_equals(link.testElement, lightParagraph2);
      assert_equals(link.getAttribute("test"), "");
    });
  });
  suite("Deleting a reflected element should return null for the IDL attribute and the content attribute will be empty", () => {
    const [ root, { deletionParent } ] = setupTestContent(html`
  <${elementName} id="deletionParent" role="listbox" test="contentAttrElement">
    <${targetReferenceElementName} role="option" id="contentAttrElement">Item 1</${targetReferenceElementName}>
    <${targetReferenceElementName} role="option" id="idlAttrElement">Item 2</${targetReferenceElementName}>
  </${elementName}>
    `);
    test("Deleting a reflected element should return null for the IDL attribute and the content attribute will be empty", () => {
      const contentAttrElement = root.getElementById("contentAttrElement");
      const idlAttrElement = root.getElementById("idlAttrElement");

      assert_equals(deletionParent.getAttribute("test"), "contentAttrElement");
      assert_equals(deletionParent.testElement, contentAttrElement);

      // Deleting an element set via the content attribute.
      deletionParent.removeChild(contentAttrElement);
      assert_equals(deletionParent.getAttribute("test"), "contentAttrElement");

      // As it was not explitly set, the attr-associated-element is computed from the content attribute,
      // and since descendant1 has been removed from the DOM, it is not valid.
      assert_equals(deletionParent.testElement, null);

      // Deleting an element set via the IDL attribute.
      deletionParent.testElement = idlAttrElement;
      assert_equals(deletionParent.getAttribute("test"), "");

      deletionParent.removeChild(idlAttrElement);
      assert_equals(deletionParent.testElement, null);

      // The content attribute is still empty.
      assert_equals(deletionParent.getAttribute("test"), "");
    });
  });
  suite("Changing the ID of an element doesn't lose the reference", () => {
    const [ root, { parentNode } ] = setupTestContent(html`
  <${elementName} id="parentNode" role="listbox" test="changingIdElement">
    <${targetReferenceElementName} role="option" id="changingIdElement">Item 1</${targetReferenceElementName}>
    <${targetReferenceElementName} role="option" id="persistantIDElement">Item 2</${targetReferenceElementName}>
  </${elementName}>
    `);
    test("Changing the ID of an element doesn't lose the reference", () => {
      const changingIdElement = root.getElementById("changingIdElement");
      assert_equals(parentNode.testElement, changingIdElement);

      // Modify the id attribute.
      changingIdElement.setAttribute("id", "new-id");

      // The content attribute still reflects the old id, and we expect the
      // Element reference to be null as there is no DOM node with id "original"
      assert_equals(parentNode.getAttribute("test"), "changingIdElement");
      assert_equals(parentNode.testElement, null, "Element set via content attribute with a changed id will return null on getting");

      parentNode.testElement = changingIdElement;
      assert_equals(parentNode.getAttribute("test"), "");
      assert_equals(parentNode.testElement, changingIdElement);

      // The explicitly set element takes precendance over the content attribute.
      // This means that we still return the same element reference, but the
      // content attribute is empty.
      changingIdElement.setAttribute("id", "newer-id");
      assert_equals(parentNode.testElement, changingIdElement, "explicitly set element is still present even after the id has been changed");
      assert_equals(parentNode.getAttribute("test"), "", "content attribute is empty.");
    });
  });
  suite("Reparenting an element into a descendant shadow scope hides the element reference", () => {
    const [root, { lightParent, shadowHostElement }] = setupTestContent(html`
  <${elementName} id="lightParent" role="listbox">
    <${targetReferenceElementName} id="lightElement" role="option">Hello world!</${targetReferenceElementName}>
  </${elementName}>
  <div id="shadowHostElement"></div>
    `);
    test("Reparenting an element into a descendant shadow scope hides the element reference", () => {
      const lightElement = root.getElementById("lightElement");
      const shadowRoot = shadowHostElement.attachShadow({mode: "open"});

      assert_equals(lightParent.testElement, null, 'null before');
      assert_equals(lightParent.getAttribute('test'), null, 'null before');

      lightParent.testElement = lightElement;
      assert_equals(lightParent.testElement, lightElement);
      assert_equals(lightParent.getAttribute('test'), "");

      // Move the referenced element into shadow DOM.
      // This will cause the computed attr-associated element to be null as the
      // referenced element will no longer be in a valid scope.
      // The underlying reference is kept intact, so if the referenced element is
      // later restored to a valid scope the computed attr-associated element will
      // then reflect
      shadowRoot.appendChild(lightElement);
      assert_equals(lightParent.testElement, null, "computed attr-assoc element should be null as referenced element is in an invalid scope");
      assert_equals(lightParent.getAttribute("test"), "");

      // Move the referenced element back into light DOM.
      // Since the underlying reference was kept intact, after moving the
      // referenced element back to a valid scope should be reflected in the
      // computed attr-associated element.
      lightParent.appendChild(lightElement);
      assert_equals(lightParent.testElement, lightElement, "computed attr-assoc element should be restored as referenced element is back in a valid scope");
      assert_equals(lightParent.getAttribute("test"), "");
    });
  });
  suite("Reparenting referenced element cannot cause retargeting of reference", () => {
    const [ root, { fruitbowl, apple, shadowFridge }] = setupTestContent(html`
  <${elementName} id='fruitbowl' role='listbox'>
    <${targetReferenceElementName} id='apple' role='option'>I am an apple</${targetReferenceElementName}>
    <${targetReferenceElementName} id='pear' role='option'>I am a pear</${targetReferenceElementName}>
    <${targetReferenceElementName} id='banana' role='option'>I am a banana</${targetReferenceElementName}>
  </${elementName}>
  <div id='shadowFridge'></div>
    `);
    test("Reparenting referenced element cannot cause retargeting of reference", () => {
      const shadowRoot = shadowFridge.attachShadow({mode: "open"});
      const banana = root.getElementById("banana");

      fruitbowl.testElement = apple;
      assert_equals(fruitbowl.testElement, apple);
      assert_equals(fruitbowl.getAttribute("test"), "");

      // Move the referenced element into shadow DOM.
      shadowRoot.appendChild(apple);
      assert_equals(fruitbowl.testElement, null, "computed attr-assoc element should be null as referenced element is in an invalid scope");
      // The content attribute is still empty.
      assert_equals(fruitbowl.getAttribute("test"), "");

      // let us rename our banana to an apple
      banana.setAttribute("id", "apple");
      const lyingBanana = root.getElementById("apple");
      assert_equals(lyingBanana, banana);

      // our testElement thankfully isn't tricked.
      // this is thanks to the underlying reference being kept intact, it is
      // checked and found to be in an invalid scope.
      assert_equals(fruitbowl.testElement, null);
      // our content attribute is empty.
      assert_equals(fruitbowl.getAttribute("test"), "");

      // when we remove our IDL attribute, the content attribute is also thankfully cleared.
      fruitbowl.testElement = null;
      assert_equals(fruitbowl.testElement, null);
      assert_equals(fruitbowl.getAttribute("test"), null);
    });
  });
  suite("Element reference set in invalid scope remains intact throughout move to valid scope", () => {
    const [, { toaster, shadowPantry }] = setupTestContent(html`
  <${elementName} id='toaster' role='listbox'></${elementName}>
  <div id='shadowPantry'></div>
    `);
    test("Element reference set in invalid scope remains intact throughout move to valid scope", () => {
      const shadowRoot = shadowPantry.attachShadow({mode: "open"});

      // Our toast starts in the shadowPantry.
      const toast = document.createElement(targetReferenceElementName);
      toast.setAttribute("id", "toast");
      shadowRoot.appendChild(toast);

      // Prepare my toast for toasting
      toaster.testElement = toast;
      assert_equals(toaster.testElement, null);
      assert_equals(toaster.getAttribute("test"), "");

      // Time to make some toast
      toaster.appendChild(toast);
      assert_equals(toaster.testElement, toast);
      // Current spec behaviour:
      assert_equals(toaster.getAttribute("test"), "");
    });
  });
  suite("Reparenting", () => {
    const [ , { input, first } ] = setupTestContent(html`
  <${elementName} id="input"></${elementName}>
    <div>
      <${targetReferenceElementName} id="first">First option</${targetReferenceElementName}>
      <${targetReferenceElementName} id="second">Second option</${targetReferenceElementName}>
    </div>
    `);
    test("Reparenting", () => {
      input.testElement = first;
      first.parentElement.appendChild(first);

      assert_equals(input.testElement, first);
    });
  });
  suite("Attaching element reference before it's inserted into the DOM", () => {
    const [, { fromDiv } ] = setupTestContent(html`
  <${elementName} id='fromDiv'></${elementName}>
    `);
    test("Attaching element reference before it's inserted into the DOM", () => {
      const toSpan = document.createElement(targetReferenceElementName);
      toSpan.setAttribute("id", "toSpan");
      fromDiv.testElement = toSpan;

      assert_equals(fromDiv.testElement, null, "Referenced element not inserted into document, so is in an invalid scope.");
      assert_equals(fromDiv.getAttribute("test"), "", "Invalid scope, so content attribute not set.");

      fromDiv.appendChild(toSpan);
      assert_equals(fromDiv.testElement, toSpan, "Referenced element now inserted into the document.");
      assert_equals(fromDiv.getAttribute("test"), "", "Content attribute remains empty, as it is only updated at set time.");
    });
  });
  if (!typed || typeof customElements.initialize === "function") {
    suite("Cross-document references and moves", () => {
      const [, { originalDocumentDiv } ] = setupTestContent(html`
  <${elementName} id='originalDocumentDiv'></${elementName}>
      `);
      test("Cross-document references and moves", () => {
        const newDoc = document.implementation.createHTMLDocument('new document');
        if (typeof customElements.initialize === "function") {
          customElements.initialize(newDoc);
        }
        const newDocSpan = newDoc.createElement(targetReferenceElementName);
        newDoc.body.appendChild(newDocSpan);

        // Create a reference across documents.
        originalDocumentDiv.testElement = newDocSpan;

        assert_equals(originalDocumentDiv.testElement, null, "Cross-document is an invalid scope, so reference will not be visible.");
        assert_equals(originalDocumentDiv.getAttribute("test"), "", "Invalid scope when set, so content attribute not set.");

        // "Move" span to first document.
        originalDocumentDiv.appendChild(newDocSpan);

        // Implementation defined: moving object into same document from other document may cause reference to become visible.
        assert_equals(originalDocumentDiv.testElement, newDocSpan, "Implementation defined: moving object back *may* make reference visible.");
        assert_equals(originalDocumentDiv.getAttribute("test"), "", "Invalid scope when set, so content attribute not set.");
      });
    });
  }
  if (typeof customElements.initialize === "function") {
    test("Adopting element keeps references", () => {
      const otherDoc = document.implementation.createHTMLDocument('otherDoc');
      customElements.initialize(otherDoc);
      const otherDocDiv = otherDoc.createElement(elementName);
      const otherDocSpan = otherDoc.createElement(targetReferenceElementName);
      otherDocDiv.appendChild(otherDocSpan);
      otherDoc.body.appendChild(otherDocDiv);

      otherDocDiv.testElement = otherDocSpan;
      assert_equals(otherDocDiv.testElement, otherDocSpan, "Setting reference on a different document.");

      // Adopt element from other oducment.
      document.body.appendChild(document.adoptNode(otherDocDiv));
      assert_equals(otherDocDiv.testElement, otherDocSpan, "Reference should be kept on the new document too.");
    });
  }
  suite("Passing values of the wrong type should throw a TypeError", () => {
    const [, { badInputValues, badInputValues2 }] = setupTestContent(html`
  <${elementName} id="badInputValues"></${elementName}>
  <${targetReferenceElementName} id="badInputValues2"></${targetReferenceElementName}>
    `);
    test("Passing values of the wrong type should throw a TypeError", () => {
      assert_throws_js(TypeError, () => { badInputValues.testElement = "a string"; });
      assert_throws_js(TypeError, () => { badInputValues.testElement = 1; });
      assert_throws_js(TypeError, () => { badInputValues.testElement = [ badInputValues2 ]; });
    });
  });
}

export function reflectElementReferences(elementName, typed = false) {
  const targetReferenceElementName = typed ? "test-reference-target" : "div";

  suite("", () => {
    const [, { startTime, errorMessage }] = setupTestContent(html`
  <${elementName} id="startTime" ></${elementName}>
  <${targetReferenceElementName} id="errorMessage">Invalid Time</${targetReferenceElementName}>
    `);
    test("", () => {
      startTime.testElements = [errorMessage];
      assert_equals(startTime.getAttribute("test"), "");
      assert_array_equals(startTime.testElements, [errorMessage]);

      startTime.testElements = [];
      assert_array_equals(startTime.testElements, []);
      assert_equals(startTime.getAttribute("test"), "");

      startTime.setAttribute("test", "errorMessage");
      assert_array_equals(startTime.testElements, [errorMessage]);
    });
  });
  suite("", () => {
    const [, { passwordField, listItem1, listItem2 } ] = setupTestContent(html`
  <label>
    Password:
    <${elementName} id="passwordField" type="password" test="pw"></${elementName}>
  </label>

  <div>
    <${targetReferenceElementName} id="listItem1">First description.</${targetReferenceElementName}>
    <${targetReferenceElementName} id="listItem2">Second description.</${targetReferenceElementName}>
  </div>
    `);
    test("", () => {
      assert_array_equals(passwordField.testElements, []);
      passwordField.testElements = [ listItem1 ];
      assert_equals(passwordField.getAttribute("test"), "");
      assert_array_equals(passwordField.testElements, [ listItem1 ]);

      passwordField.testElements = [ listItem2 ];
      assert_equals(passwordField.getAttribute("test"), "");
      assert_array_equals(passwordField.testElements, [ listItem2 ]);
    });
  });
  suite("", () => {
    const [ root, { billingElementContainer, nameElement, input1, addressElement, input2 } ] = setupTestContent(html`
  <div id="billingElementContainer">
      <${targetReferenceElementName} id="billingElement">Billing</${targetReferenceElementName}>
  </div>
  <div>
      <${targetReferenceElementName} id="nameElement">Name</${targetReferenceElementName}>
      <${elementName} type="text" id="input1" test="billingElement nameElement"></${elementName}>
  </div>
  <div>
      <${targetReferenceElementName} id="addressElement">Address</${targetReferenceElementName}>
      <${elementName} type="text" id="input2"></${elementName}>
  </div>
    `)
    test("", () => {
      const billingElement = root.getElementById("billingElement")
      assert_array_equals(input1.testElements, [billingElement, nameElement], "parsed content attribute sets element references.");
      assert_equals(input1.testElements, input1.testElements, "check idl attribute caching after parsing");
      assert_equals(input2.testElements, null, "Testing missing content attribute after parsing.");

      input2.testElements = [billingElement, addressElement];
      assert_array_equals(input2.testElements, [billingElement, addressElement], "Testing IDL setter/getter.");
      assert_equals(input1.testElements, input1.testElements, "check idl attribute caching after update");
      assert_equals(input2.getAttribute("test"), "");

      // Remove the billingElement from the DOM.
      // As it was explicitly set the underlying association will remain intact,
      // but it will be hidden until the element is moved back into a valid scope.
      billingElement.remove();
      assert_array_equals(input2.testElements, [addressElement], "Computed testElements shouldn't include billing when out of scope.");

      // Insert the billingElement back into the DOM and check that it is visible
      // again, as the underlying association should have been kept intact.
      billingElementContainer.appendChild(billingElement);
      assert_array_equals(input2.testElements, [billingElement, addressElement], "Billing element back in scope.");

      input2.testElements = [];
      assert_array_equals(input2.testElements, [], "Testing IDL setter/getter for empty array.");
      assert_equals(input2.getAttribute("test"), "");

      input1.removeAttribute("test");
      assert_equals(input1.testElements, null);

      input1.setAttribute("test", "nameElement addressElement");
      assert_array_equals(input1.testElements, [nameElement, addressElement],
        "computed value after setting attribute directly");

      input1.testElements = null;
      assert_false(input1.hasAttribute("test", "Nullifying the IDL attribute should remove the content attribute."));
    });
  });
  suite("", () => {
    const [, { link1, link2, panel1, panel2 }] = setupTestContent(html`
  <ul role="tablist">
    <li role="presentation"><${elementName} id="link1" role="tab" test="panel1">Tab 1</${elementName}></li>
    <li role="presentation"><${elementName} id="link2" role="tab">Tab 2</${elementName}></li>
  </ul>

  <${targetReferenceElementName} role="tabpanel" id="panel1"></${targetReferenceElementName}>
  <${targetReferenceElementName} role="tabpanel" id="panel2"></${targetReferenceElementName}>
    `)
    test("", () => {
      assert_array_equals(link1.testElements, [panel1]);
      assert_equals(link2.testElements, null);

      link2.setAttribute("test", "panel1 panel2");
      assert_array_equals(link2.testElements, [panel1, panel2]);

      link1.testElements = [];
      assert_equals(link1.getAttribute("test"), "");

      link2.testElements = [panel1, panel2];
      assert_equals(link2.getAttribute("test"), "");
      assert_array_equals(link2.testElements, [panel1, panel2]);

      link2.removeAttribute("test");
      assert_equals(link2.testElements, null);

      link2.testElements = [panel1, panel2];
      assert_equals(link2.getAttribute("test"), "");
      assert_array_equals(link2.testElements, [panel1, panel2]);

      link2.testElements = null;
      assert_false(link2.hasAttribute("test", "Nullifying the IDL attribute should remove the content attribute."));
    });
  });
  suite("shadow DOM behaviour for FrozenArray element reflection", () => {
    const [, { lightDomHeading, host, lightDomText1, lightDomText2 }] = setupTestContent(html`
  <div id="lightDomContainer">
    <${elementName} id="lightDomHeading" test="shadowChild1 shadowChild2">Light DOM Heading</${elementName}>
    <div id="host"></div>
    <${targetReferenceElementName} id="lightDomText1">Light DOM text</${targetReferenceElementName}>
    <${targetReferenceElementName} id="lightDomText2">Light DOM text</${targetReferenceElementName}>
  </div>
    `);
    test("shadow DOM behaviour for FrozenArray element reflection", () => {
      const shadowRoot = host.attachShadow({mode: "open"});
      const shadowChild1 = document.createElement(elementName);
      shadowRoot.appendChild(shadowChild1);
      const shadowChild2 = document.createElement(elementName);
      shadowRoot.appendChild(shadowChild2);
      const shadowChildTarget1 = document.createElement(targetReferenceElementName);
      shadowChildTarget1.setAttribute("id", "shadowChild1");
      shadowRoot.appendChild(shadowChildTarget1);
      const shadowChildTarget2 = document.createElement(targetReferenceElementName);
      shadowChildTarget2.setAttribute("id", "shadowChild1");
      shadowRoot.appendChild(shadowChildTarget2);
  
      // The elements in the content attribute are in a "darker" tree - they
      // enter a shadow encapsulation boundary, so not be associated any more.
      assert_array_equals(lightDomHeading.testElements, []);
  
      // These elements are in a shadow including ancestor, i.e "lighter" tree.
      // Valid for the IDL attribute, but content attribute should be null.
      shadowChild1.testElements = [lightDomText1, lightDomText2];
      assert_equals(shadowChild1.getAttribute("test"), "", "empty content attribute for elements that cross shadow boundaries.");
  
      // These IDs belong to a different scope, so the attr-associated-element
      // cannot be computed.
      shadowChild2.setAttribute("test", "lightDomText1 lightDomText2");
      assert_array_equals(shadowChild2.testElements, []);
  
      // Elements that cross into shadow DOM are dropped, only reflect the valid
      // elements in IDL and in the content attribute.
      lightDomHeading.testElements = [shadowChildTarget1, shadowChildTarget2, lightDomText1, lightDomText2];
      assert_array_equals(lightDomHeading.testElements, [lightDomText1, lightDomText2], "IDL should only include valid elements");
      assert_equals(lightDomHeading.getAttribute("test"), "", "empty content attribute if any given elements cross shadow boundaries");
  
      // Using a mixture of elements in the same scope and in a shadow including
      // ancestor should set the IDL attribute, but should reflect the empty
      // string in the content attribute.
      shadowChild1.removeAttribute("test");
      shadowChild1.testElements = [shadowChildTarget1, lightDomText1];
      assert_equals(shadowChild1.getAttribute("test"), "", "Setting IDL elements with a mix of scopes should reflect an empty string in the content attribute")
    });
  });
  suite("Moving explicitly set elements across shadow DOM boundaries", () => {
    const [ root, { describedButtonContainer, outerShadowHost } ] = setupTestContent(html`
  <div id="describedButtonContainer">
    <${targetReferenceElementName} id="buttonDescription1">Delicious</${targetReferenceElementName}>
    <${targetReferenceElementName} id="buttonDescription2">Nutritious</${targetReferenceElementName}>
    <div id="outerShadowHost"></div>
  </div>
    `);
    test("Moving explicitly set elements across shadow DOM boundaries", () => {
      const description1 = root.getElementById("buttonDescription1");
      const description2 = root.getElementById("buttonDescription2");
      const outerShadowRoot = outerShadowHost.attachShadow({mode: "open"});
      const innerShadowHost = document.createElement("div");
      outerShadowRoot.appendChild(innerShadowHost);
      const innerShadowRoot = innerShadowHost.attachShadow({mode: "open"});

      // Create an element, add some attr associated light DOM elements and append it to the outer shadow root.
      const describedElement = document.createElement(elementName);
      describedButtonContainer.appendChild(describedElement);
      describedElement.testElements = [description1, description2];

      // All elements were in the same scope, so elements are gettable and the content attribute is empty.
      assert_array_equals(describedElement.testElements, [description1, description2], "same scope reference");
      assert_equals(describedElement.getAttribute("test"), "");

      outerShadowRoot.appendChild(describedElement);

      // Explicitly set attr-associated-elements should still be gettable because we are referencing elements in a lighter scope.
      // The content attr is empty.
      assert_array_equals(describedElement.testElements, [description1, description2], "lighter scope reference");
      assert_equals(describedElement.getAttribute("test"), "");

      // Move the explicitly set elements into a deeper shadow DOM to test the relationship should not be gettable.
      innerShadowRoot.appendChild(description1);
      innerShadowRoot.appendChild(description2);

      // Explicitly set elements are no longer retrievable, because they are no longer in a valid scope.
      assert_array_equals(describedElement.testElements, [], "invalid scope reference");
      assert_equals(describedElement.getAttribute("test"), "");

      // Move into the same shadow scope as the explicitly set elements to test that the elements are gettable.
      innerShadowRoot.appendChild(describedElement);
      assert_array_equals(describedElement.testElements, [description1, description2], "restored valid scope reference");
      assert_equals(describedElement.getAttribute("test"), "");
    });
  });
  suite("Moving explicitly set elements around within the same scope, and removing from the DOM", () => {
    const [ root, { sameScopeContainer, labelledby, headingShadowHost }] = setupTestContent(html`
  <div id="sameScopeContainer">
    <${elementName} id="labelledby" test="headingLabel1 headingLabel2">Misspelling</${elementName}>
    <${targetReferenceElementName} id="headingLabel1">Wonderful</${targetReferenceElementName}>
    <${targetReferenceElementName} id="headingLabel2">Fantastic</${targetReferenceElementName}>

    <div id="headingShadowHost"></div>
  </div>
    `);
    test("Moving explicitly set elements around within the same scope, and removing from the DOM", () => {
      const shadowRoot = headingShadowHost.attachShadow({mode: "open"});
      const headingElement = document.createElement(elementName);
      const headingLabel1 = root.getElementById("headingLabel1")
      const headingLabel2 = root.getElementById("headingLabel2")
      shadowRoot.appendChild(headingElement);

      assert_array_equals(labelledby.testElements, [headingLabel1, headingLabel2], "test is supported by IDL getter.");

      // Explicitly set elements are in a lighter shadow DOM, so that's ok.
      headingElement.testElements = [headingLabel1, headingLabel2];
      assert_array_equals(headingElement.testElements, [headingLabel1, headingLabel2], "Lighter elements are gettable when explicitly set.");
      assert_equals(headingElement.getAttribute("test"), "");

      // Move into Light DOM, explicitly set elements should still be gettable.
      // Note that the content attribute is still empty.
      sameScopeContainer.appendChild(headingElement);
      assert_array_equals(headingElement.testElements, [headingLabel1, headingLabel2], "Elements are all in same scope, so gettable.");
      assert_equals(headingElement.getAttribute("test"), "", "Content attribute is empty.");

      // Reset the association, the content attribute is sitll empty.
      headingElement.testElements = [headingLabel1, headingLabel2];
      assert_equals(headingElement.getAttribute("test"), "");

      // Remove the referring element from the DOM, elements are no longer longer exposed,
      // underlying internal reference is still kept intact.
      headingElement.remove();
      assert_array_equals(headingElement.testElements, [], "Element is no longer in the document, so references should no longer be exposed.");
      assert_equals(headingElement.getAttribute("test"), "");

      // Insert it back in.
      sameScopeContainer.appendChild(headingElement);
      assert_array_equals(headingElement.testElements, [headingLabel1, headingLabel2], "Element is restored to valid scope, so should be gettable.");
      assert_equals(headingElement.getAttribute("test"), "");

      // Remove everything from the DOM, nothing is exposed again.
      headingLabel1.remove();
      headingLabel2.remove();
      assert_array_equals(headingElement.testElements, []);
      assert_equals(headingElement.getAttribute("test"), "");
      assert_equals(document.getElementById("headingLabel1"), null);
      assert_equals(document.getElementById("headingLabel2"), null);

      // Reset the association.
      headingElement.testElements = [headingLabel1, headingLabel2];
      assert_array_equals(headingElement.testElements, []);
      assert_equals(headingElement.getAttribute("test"), "");
    });
  });
  suite("Caching invariant", () => {
    const [, { cachingInvariantMain, cachingInvariantElement1, cachingInvariantElement2, cachingInvariantElement3, cachingInvariantElement4, cachingInvariantElement5, cachingInvariantMain1, cachingInvariantMain2 } ] = setupTestContent(html`
  <${elementName} id="cachingInvariantMain"></${elementName}>
  <${targetReferenceElementName} id="cachingInvariantElement1"></${targetReferenceElementName}>
  <${targetReferenceElementName} id="cachingInvariantElement2"></${targetReferenceElementName}>
  <${targetReferenceElementName} id="cachingInvariantElement3"></${targetReferenceElementName}>
  <${targetReferenceElementName} id="cachingInvariantElement4"></${targetReferenceElementName}>
  <${targetReferenceElementName} id="cachingInvariantElement5"></${targetReferenceElementName}>

  <${elementName} id="cachingInvariantMain1"></${elementName}>
  <${elementName} id="cachingInvariantMain2"></${elementName}>
    `);
    test("Caching invariant different attributes", () => {
      cachingInvariantMain.testElements = [cachingInvariantElement1, cachingInvariantElement2];

      let testElementsArray = cachingInvariantMain.testElements;

      assert_equals(testElementsArray, cachingInvariantMain.testElements, "Caching invariant for testElements");

      // Ensure that stale values don't continue to be cached
      cachingInvariantMain.testElements = [cachingInvariantElement4, cachingInvariantElement5];

      testElementsArray = cachingInvariantMain.testElements;

      assert_equals(testElementsArray, cachingInvariantMain.testElements, "Caching invariant for testElements");
    });
    test("Caching invariant different elements", () => {
      cachingInvariantMain1.testElements = [cachingInvariantElement1, cachingInvariantElement2];
      cachingInvariantMain2.testElements = [cachingInvariantElement3, cachingInvariantElement4];

      let testElementsArray1 = cachingInvariantMain1.testElements;
      let testElementsArray2 = cachingInvariantMain2.testElements;

      assert_equals(testElementsArray1, cachingInvariantMain1.testElements, "Caching invariant for testElements in one elemnt");
      assert_equals(testElementsArray2, cachingInvariantMain2.testElements, "Caching invariant for testElements in onother elemnt");
    });
  });
  suite("Passing values of the wrong type should throw a TypeError", () => {
    const [, { badInputValues, badInputValues2 }] = setupTestContent(html`
  <${elementName} id="badInputValues"></${elementName}>
  <${targetReferenceElementName} id="badInputValues2"></${targetReferenceElementName}>
    `);
    test("Passing values of the wrong type should throw a TypeError", () => {
      assert_throws_js(TypeError, () => { badInputValues.testElements = "a string" });
      assert_throws_js(TypeError, () => { badInputValues.testElements = 1 });
      assert_throws_js(TypeError, () => { badInputValues.testElements = [1, 2, 3] });
      assert_throws_js(TypeError, () => { badInputValues.testElements = badInputValues2 });
    });
  });
}

// Adapted from https://github.com/web-platform-tests/wpt/blob/6b105fe9035c980be1d4f8564d539d50d7441cfd/html/dom/aria-element-reflection-disconnected.html
