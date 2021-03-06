### :boom: Careful: This package is no longer maintained and is only here for historic reasons. This means you should very likely not use it. You have been warned. :boom:

---

# karma-checkmark-reporter

Test reporter that prints small but useful results to console (for Karma). Supports diffing and smart error messages.

> Using `mocha`? Check out [mocha-checkmark-reporter](https://github.com/queicherius/mocha-checkmark-reporter). 
Want to make one for your own testing framework? Check out [generic-checkmark-reporter](https://github.com/queicherius/generic-checkmark-reporter).

![](screenshot.png)

## Usage

```
npm install karma-checkmark-reporter --save-dev
```

Add the following to your karma.conf.js:

```
plugins: ['karma-checkmark-reporter'],
reporters: ['checkmark']
```

Also, consider using [this fork of `karma-mocha`](https://github.com/queicherius/karma-mocha) which allows propper diffing.

