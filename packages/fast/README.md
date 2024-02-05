# FAST implementation

Implementation notes:

- does not use FAST's native support for reflection (`mode: "reflect"`, which is the default behavior) as it is asynchronous (attributes are only updated in a `requestAnimationFrame`).
  Custom property accessors are used instead to explicitly (and synchronously) set the attribute.

- custom property setters also coerce the values without relying on a converter's `fromView` that couldn't tell the difference between the property being set by the user or in reaction to an attribute change

- uses an internal property (here only using a `_`-prefixed naming convention; with TypeScript it could be a `private` property, but it cannot be a native `#`-private field as FAST will generate a `_`-prefixed field)
  rather than directly declaring the `test` property as reactive to be able to tell the difference between the property being set by the user (the `test` property setter is called) and the property changing due to the attribute changing (the `_test` property converter's `fromView` is called):
  the `test` setter coerces the value, validates it, then set the attribute, which triggers `attributeChangedCallback` that will set the internal property, rather than reentering the `test` setter.

- parsing of attribute values is done through a converter in the property definition,
  except for the `url` case where the document's `baseURI` could change between the attribute changed and the property is read,
  so the value is always _parsed_ in the property getter.

- default values are handled in the `test` property getter rather than initializing the `_test` property to avoid having the converter's `fromView` called with a value not coming from the attribute
  (as an alternative, the `_test` property could be initialized with a value as if it came from the attribute, to be processed by the converter, but this would make the code harder to understand, e.g. setting a boolean or enum property to `null` to actually initialize it with `false` or the enum's _missing value default_).

Overall, the behavior is similar to the _cached_ variant of the [vanilla implementation](../vanilla/README.md), except using FAST's specific lifecycle hooks.
