require('colors')
var genericReporter = require('generic-checkmark-reporter')

var CheckmarkReporter = function (baseReporterDecorator) {
  baseReporterDecorator(this)

  var _onRunStart = this.onRunStart
  this.onRunStart = function () {
    // Bind the log function to inject it into the generic reporter,
    // because using normal process.stdout.write crashes the process for some reason
    var log = (function (s) {
      this.writeCommonMsg(s)
    }).bind(this)

    genericReporter.start(log)
    _onRunStart.call(this, arguments)
  }

  this.specFailure = function (browser, results) {
    // Get the best error we can get out of karma
    var parsedLog = results.log[0].split('\n')
    var error = results.assertionErrors.length > 0
      ? results.assertionErrors[0]
      : {message: parsedLog[0]}

    if (!error.stack) {
      error.stack = parsedLog[1]
    }

    // Report the failure
    var failure = {
      description: results.suite.join(' ') + ' ' + results.description,
      environment: browser.name.replace(/ \(.*$/, ''),
      error: error
    }
    genericReporter.result('failure', failure)
  }

  this.specSuccess = function () {
    genericReporter.result('success')
  }

  this.specSkipped = function () {
    genericReporter.result('skipped')
  }

  this.onRunComplete = function () {
    genericReporter.end()
  }
}

CheckmarkReporter.$inject = ['baseReporterDecorator']
module.exports = {'reporter:checkmark': ['type', CheckmarkReporter]}
