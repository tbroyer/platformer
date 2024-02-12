# @platformer/vanilla

This implementation serves as a reference implementation of decorators following the [_@platformer/types_](../types/README.md) API.

It actually comes with 2 distinct implementations:

- a _direct_ implementation (exposed as `@platformer/vanilla`) following the HTML specification:
  the property getter directly reads the attribute value and parses it.

  ```js
  class MyElemet extends HTMLElement {
    @reflectXxx({ ...options }) accessor attr;
  }
  ```

- (TODO: tests currently still directly use _@platformer/reflect_) a _cached_ implementation:
  the attribute is observed and the value is parsed in `attributeChangedCallback` and cached in a private field,
  the property getter can then directly return that private field.
