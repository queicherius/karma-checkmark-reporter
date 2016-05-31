# karma-checkmark-reporter

Test reporter, that prints small but useful results to console. 
(Based on [karma-spec-reporter](https://github.com/mlex/karma-spec-reporter).)

![](screenshot.png)

## Usage

To use in your own Node.js project, just execute
```
npm install karma-checkmark-reporter --save-dev
```
This will download the karma-spec-reporter and add the dependency to `package.json`.

Then add the following to your karma.conf.js:

```
plugins: ['karma-checkmark-reporter'],
reporters: ['checkmark']
```