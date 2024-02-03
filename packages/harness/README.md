# Test harness

This package embeds the reflection test harnesses from the Gecko and WPT codebases,
and defines a test suite based on them exercizing the various data types,
to be used for testing custom elements implemented in various ways
(e.g. with various libraries/frameworks).

## Usage

1. Create a package in the workspaces to contain the tests.
2. Implement all the custom elements that will be tested
   following the requirements below
3. Import the `runTests` function from this package and call it
4. Run the tests (likely using Web Test Runner) by the `test` NPM script,
   so it's possible to run all tests with `npm -ws run test` at the root.

## Custom element requirements

All custom elements must be registered (`customElements.define`) before calling `runTests()`.
Their name are of the form `test-datatype`, where `datatype` is the data type being tested and whose behavior will have to be implemented.
They have a `test` property that reflect a `test` attribute.

### test-string

The `test-string` element's reflected `test` attribute is of type `DOMString`, with no other option.

This is equivalent to the `alt` attribute of an `img` element for example.

### test-url

The `test-url` element's reflected `test` attribute is of type `USVString` and contains a URL.

This is equivalent to the `cite` attribute of a `blockquote` element for example.

<!-- TODO: enum, nullable enum -->

### test-boolean

The `test-boolean` element's reflected `test` attribute is of type `boolean`.

This is equivalent to the `disabled` or `readonly` attributes of form elements for example.

### test-long

The `test-long` element's reflected `test` attribute is of type `long` with a default value of 42.

### test-limited-long

The `test-limited-long` element's reflected `test` attribute is of type `long` limited to only non-negative numbers and with no default value.

### test-unsigned-long

The `test-unsigned-long` element's reflected `test` attribute is of type `unsigned long` with a default value of 42.

### test-limited-unsigned-long

The `test-limited-unsigned-long` element's reflected `test` attribute is of type `unsigned long` limited to only positive numbers and with no default value.

### test-limited-unsigned-long-with-fallback

The `test-limited-unsigned-long-with-fallback` element's reflected `test` attribute is of type `unsigned long` limited to only positive numbers with fallback, and with no default value.

### test-clamped-unsigned-long

The `test-clamped-unsigned-long` element's reflected `test` attribute is of type `unsigned long` clamped to the range [42, 1337] and with a default value of 100.

### test-double

The `test-double` element's `test` attribute is of type `double` with no other option.

### test-limited-double

The `test-limited-double` element's `test` attribute is of type `double` limited to only positive numbers and with a default value of 1.
