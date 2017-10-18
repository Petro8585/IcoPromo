var config = require('./config'),
  runSequence = require('run-sequence')

var buildLanguages = function () {
  var index = 0
  var buildRoot = config.build.root
  var buildLang = function () {
    if (!config.languages[index]) {
      config.lang = 'en'
      config.build.root = buildRoot
      index = 0
      return
    }

    config.lang = config.languages[index]
    config.build.root = buildRoot + '/' + config.languages[index]

    runSequence('html', function () {
      index++
      buildLang()
    })
  }
  return buildLang
}

module.exports = buildLanguages
