import { runTests } from "@webfeet/reflect-harness";
import {
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
} from "@webfeet/reflect-vanilla";

customElements.define(
  "test-string",
  class extends HTMLElement {
    @reflectString() accessor test;
  },
);

customElements.define(
  "test-url",
  class extends HTMLElement {
    @reflectURL() accessor test;
  },
);

customElements.define(
  "test-enum",
  class extends HTMLElement {
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
  class extends HTMLElement {
    @reflectNullableEnum({
      keywords: ["use-credentials", "anonymous"],
      invalid: "anonymous",
    })
    accessor test;
  },
);

customElements.define(
  "test-boolean",
  class extends HTMLElement {
    @reflectBoolean() accessor test;
  },
);

customElements.define(
  "test-long",
  class extends HTMLElement {
    @reflectInt({ defaultValue: 42 }) accessor test;
  },
);
customElements.define(
  "test-limited-long",
  class extends HTMLElement {
    @reflectNonNegativeInt() accessor test;
  },
);
customElements.define(
  "test-unsigned-long",
  class extends HTMLElement {
    @reflectUnsignedInt({ defaultValue: 42 }) accessor test;
  },
);
customElements.define(
  "test-limited-unsigned-long",
  class extends HTMLElement {
    @reflectPositiveInt() accessor test;
  },
);
customElements.define(
  "test-limited-unsigned-long-with-fallback",
  class extends HTMLElement {
    @reflectPositiveIntWithFallback() accessor test;
  },
);
customElements.define(
  "test-clamped-unsigned-long",
  class extends HTMLElement {
    @reflectClampedInt({ min: 42, defaultValue: 100, max: 1337 }) accessor test;
  },
);
customElements.define(
  "test-double",
  class extends HTMLElement {
    @reflectDouble() accessor test;
  },
);
customElements.define(
  "test-limited-double",
  class extends HTMLElement {
    @reflectPositiveDouble({ defaultValue: 1.0 }) accessor test;
  },
);

runTests({ disableElementReferences: true });
