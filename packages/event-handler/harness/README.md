# Event handler Test Harness

This package a test suite inspired by the Web Platform Test codebase, to be used for testing event handlers in custom elements (i.e. with event handler attribute support).

## Usage

1. Create a package in the workspaces to contain the tests.
2. Implement a `test-handler` custom element with an `onfoo` event handler
3. Import the `runTests` function from this package and call it
4. Run the tests (likely using Web Test Runner) by the `test` NPM script,
   so it's possible to run all tests with `npm -ws run test` at the root.

Note that the test suite will dynamically define an `x-foo` element that inherits the `test-handler` element's class to make it _form-associated_.
For this, it will call `attachInternals()` so the base class must not call it itself (if this becomes a problem, that `x-foo` element will become a requirement).
