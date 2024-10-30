# Test harness

This package embeds the reflection test harnesses from the Gecko and WPT codebases,
and defines a test suite based on them exercizing the various data types,
to be used for testing custom elements implemented in various ways
(e.g. with various libraries/frameworks).

It also includes an event handler test suite inspired by WPT ([see below](#usage-event-handler))

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

### test-enum

The `test-enum` element's reflected `test` attribute is an enumerated attribute of type `DOMString` limited to only known values.

- keywords `empty` and the empty string map to the _empty_ state, whose canonical keyword is the empty string
- keywords `one` et `un` map to the _one_ state, whose canonical keyword is `one`
- keywords `two` et `deux` map to the _two_ state, whose canonical keyword is `two`
- keywords `three` et `trois` map to the _three_ state, whose canonical keyword is `three`
- keyword `missing` map to the _missing_ state and is the _missing value default_
- keyword `invalid` map to the _invalid_ state and is the _invalid value default_

### test-nullable-enum

The `test-nullable-enum` element's reflected `test` attribute is an enumerated attribute of type `DOMString?` limited to only known values.
It mimics the `crossorigin` attribute of a `link` or `a` element:

- keywords `anonymous` and the empty string map to the _Anonymous_ state, `anonymous` being the canonical keyword
- keyword `use-credentials` map to the _Use Credentials_ state
- the _missing value default_ is the _No CORS_ state, and the _invalid value default_ is the _Anonymous_ state.

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

## Usage (event handler)

1. Create a package in the workspaces to contain the tests.
2. Implement a `test-handler` custom element with an `onfoo` event handler
3. Import the `runTests` function from this package's `event-handler.js` and call it
4. Run the tests (likely using Web Test Runner) by the `test` NPM script,
   so it's possible to run all tests with `npm -ws run test` at the root.

Note that the test suite will dynamically define an `x-foo` element that inherits the `test-handler` element's class to make it _form-associated_.
For this, it will call `attachInternals()` so the base class must not call it itself (if this becomes a problem, that `x-foo` element will become a requirement).
