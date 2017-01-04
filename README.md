# karma-checkmark-reporter

[![No Maintenance Intended](https://img.shields.io/badge/No%20Maintenance%20Intended-%E2%9C%95-red.svg?style=flat-square)](http://unmaintained.tech/)

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

