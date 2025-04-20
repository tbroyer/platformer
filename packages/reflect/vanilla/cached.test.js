import { TestReferenceTargetElement, runTests } from "@webfeet/reflect-harness";
import {
  BaseElement,
  reflectString,
  reflectURL,
  reflectEnum,
  reflectNullableEnum,
  reflectBoolean,
  reflectInt,
  reflectNonNegativeInt,
  reflectUnsignedInt,
  reflectPositiveInt,
  reflectPositiveIntWithFallback,
  reflectClampedInt,
  reflectDouble,
  reflectPositiveDouble,
  reflectElementReference,
  reflectElementReferences,
  reflectDOMTokenList,
} from "@webfeet/reflect-vanilla/cached.js";

customElements.define(
  "test-string",
  class extends BaseElement {
    @reflectString() accessor test;
  },
);

customElements.define(
  "test-url",
  class extends BaseElement {
    @reflectURL() accessor test;
  },
);

customElements.define(
  "test-enum",
  class extends BaseElement {
    @reflectEnum({
      keywords: ["", "one", "two", "three", "missing", "invalid"],
      aliases: { empty: "", un: "one", deux: "two", trois: "three" },
      missing: "missing",
      invalid: "invalid",
    })
    accessor test;
  },
);
customElements.define(
  "test-nullable-enum",
  class extends BaseElement {
    @reflectNullableEnum({
      keywords: ["use-credentials", "anonymous"],
      invalid: "anonymous",
    })
    accessor test;
  },
);

customElements.define(
  "test-boolean",
  class extends BaseElement {
    @reflectBoolean() accessor test;
  },
);

customElements.define(
  "test-long",
  class extends BaseElement {
    @reflectInt({ defaultValue: 42 }) accessor test;
  },
);
customElements.define(
  "test-limited-long",
  class extends BaseElement {
    @reflectNonNegativeInt() accessor test;
  },
);
customElements.define(
  "test-unsigned-long",
  class extends BaseElement {
    @reflectUnsignedInt({ defaultValue: 42 }) accessor test;
  },
);
customElements.define(
  "test-limited-unsigned-long",
  class extends BaseElement {
    @reflectPositiveInt() accessor test;
  },
);
customElements.define(
  "test-limited-unsigned-long-with-fallback",
  class extends BaseElement {
    @reflectPositiveIntWithFallback() accessor test;
  },
);
customElements.define(
  "test-clamped-unsigned-long",
  class extends BaseElement {
    @reflectClampedInt({ min: 42, defaultValue: 100, max: 1337 }) accessor test;
  },
);
customElements.define(
  "test-double",
  class extends BaseElement {
    @reflectDouble() accessor test;
  },
);
customElements.define(
  "test-limited-double",
  class extends BaseElement {
    @reflectPositiveDouble({ defaultValue: 1.0 }) accessor test;
  },
);

customElements.define(
  "test-element-reference",
  class extends BaseElement {
    @reflectElementReference() accessor testElement;
  },
);
customElements.define(
  "test-typed-element-reference",
  class extends BaseElement {
    @reflectElementReference({ type: TestReferenceTargetElement })
    accessor testElement;
  },
);
customElements.define(
  "test-element-references",
  class extends BaseElement {
    @reflectElementReferences() accessor testElements;
  },
);
customElements.define(
  "test-typed-element-references",
  class extends BaseElement {
    @reflectElementReferences({ type: TestReferenceTargetElement })
    accessor testElements;
  },
);

customElements.define(
  "test-domtokenlist",
  class extends BaseElement {
    @reflectDOMTokenList() accessor test;
  },
);
customElements.define(
  "test-domtokenlist-supportedtokens",
  class extends BaseElement {
    @reflectDOMTokenList({ supportedTokens: ["one", "two", "three"] })
    accessor test;
  },
);

runTests();
