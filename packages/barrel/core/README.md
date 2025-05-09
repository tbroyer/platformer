# webfeet

Add webfeet to your APIs to help make them [~~swim like a duck~~](https://en.wikipedia.org/wiki/Duck_test) behave like native.

> If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.

[![Published on npm](https://img.shields.io/npm/v/webfeet?logo=npm)](https://www.npmjs.com/package/webfeet)

This package is a "barrel package" reexporting [@webfeet/event-handler](../../event-handler/core/README.md), [@webfeet/microsytaxes](../../microsyntaxes/README.md), [@webfeet/reflect](../../reflect/core/README.md), and [@webfeet/webidl](../../webidl/README.md).

You'll most likely want to actually use [@webfeet/event-handler-vanilla](../../event-handler/vanilla/README.md) and [@webfeet/reflect-vanilla](../../reflect/vanilla/README.md), or [@webfeet/event-handler-lit](../../event-handler/lit/README.md) and [@webfeet/reflect-lit](../../reflect/lit/README.md) so this package is not really useful by itself.
And you should [avoid using barrel files](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/ "Speeding up the JavaScript ecosystem - The barrel file debacle, by Marvin Hagemeister") anyway.
