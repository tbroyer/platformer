# Vanilla implementation

This implementation serves as a reference implementation.

It actually comes with 2 distinct implementations:

- a _direct_ implementation following the HTML specification:
  the property getter directly reads the attribute value and parses it.

- an implementation that caches parsed values:
  the attribute is observed and the value is parsed in `attributeChangedCallback` and cached in a private field,
  the property getter can then directly return that private field.
