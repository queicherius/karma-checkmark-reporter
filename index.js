require('colors')
var SYMBOLS = {
  success: '✓',
  failure: '✗',
  skipped: '»'
}

var CheckmarkReporter = function (baseReporterDecorator, formatError) {
  baseReporterDecorator(this)

  // Reset our internal variables on start
  var _onRunStart = this.onRunStart
  this.onRunStart = function () {
    this.failures = []
    this.skipped = 0
    this.count = 0
    this.startTime = new Date()
    _onRunStart.call(this, arguments)
  }

  // On spec failure, save the failure for the report later and write a message
  this.onSpecFailure = function (browser, results) {
    results.browser = browser.name.replace(/ \(.*$/, '')
    this.failures.push(results)
    this.writeSpecMessage(SYMBOLS.failure.red).apply(this, arguments)
  }

  // Write a spec message (the symbol)
  this.writeSpecMessage = function (status) {
    var write = function (browser, result) {
      if (this.count % 25 === 0) {
        this.writeCommonMsg('\n  ')
      }

      this.count++

      if (result.skipped) {
        this.skipped++
      }

      this.writeCommonMsg(status + ' ')
    }

    return write.bind(this)
  }

  // Setup all the functions for spec messages
  this.specFailure = this.onSpecFailure
  this.specSuccess = this.writeSpecMessage(SYMBOLS.success.green)
  this.specSkipped = this.writeSpecMessage(SYMBOLS.skipped.cyan)

  // When the run is complete, show statistics of the tests
  this.onRunComplete = function (browsers, results) {
    var diff = new Date() - this.startTime

    this.writeCommonMsg('\n\n')
    this.writeCommonMsg(('  ' + SYMBOLS.success + ' ' + results.success + ' passing ').green)
    this.writeCommonMsg(('(' + diff + 'ms)').grey)

    if (this.skipped) {
      this.writeCommonMsg('\n  ' + (SYMBOLS.skipped + ' ' + this.skipped + ' pending').cyan)
    }

    if (results.failed) {
      this.writeCommonMsg('\n  ' + (SYMBOLS.failure + ' ' + results.failed + ' failing').red)
      this.logFinalErrors(this.failures)
    }

    this.writeCommonMsg('\n\n')
  }

  // Log errors at the end in a prettier format
  this.logFinalErrors = function (errors) {
    this.writeCommonMsg('\n\n')
    errors.forEach(this.logError, this)
    this.writeCommonMsg('\n')
  }

  // Log a single error
  // TODO diff errors
  this.logError = function (failure, index) {
    index = index + 1

    if (index > 1) {
      this.writeCommonMsg('\n')
    }

    this.writeCommonMsg('  ' + index + ') ' + failure.suite.join(' ') + ' ' + failure.description + ': ')
    this.writeCommonMsg(('(' + failure.browser + ')').grey + '\n\n')
    failure.log.forEach(function (log) {
      var error = formatError(log).split('\n').map(mapTrim).join('\n     ')
      this.writeCommonMsg('     ' + error.red)
    }, this)
  }
}

function mapTrim (a) {
  return a.trim()
}

CheckmarkReporter.$inject = ['baseReporterDecorator', 'formatError', 'config']

module.exports = {
  'reporter:checkmark': ['type', CheckmarkReporter]
}
