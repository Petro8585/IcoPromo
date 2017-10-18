/*-----------------------------------------------------------
 GULP : ENVIRONMENT
 Set your environment here, as of now it's development and
 production. You can also include testing and staging
-----------------------------------------------------------*/
/*==========================================================
 GULP: ENVIRONMENT :: Gulp build Tasks - dev, production
===========================================================*/
var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  config = require('./config'),
  buildLanguages = require('./languages')

gulp.task('build', function () {
  config.urlOptions.manifest = {}
  console.log(config.notify.update('\n--------- Build Development Mode  --------------------------------------\n'))
  runSequence('clean', 'scripts', 'image', 'styles', 'bundle-libraries', 'html', 'fonts', 'downloads', 'server', 'watch', buildLanguages())
})

gulp.task('prod', function () {

  console.log(config.notify.update('\n--------- Build Production Mode  ---------------------------------------\n'))
  config.production = true
  config.env = 'prod'
  config.cdnUrl = 'https://cdn.rentberry.com/ico'
  config.stylePrepend = '/ico/'
  runSequence('clean', 'scripts', 'image', 'styles', 'bundle-libraries', 'html', 'fonts', 'downloads', buildLanguages())

})

gulp.task('dev', function () {

  console.log(config.notify.update('\n--------- Build Production Mode  ---------------------------------------\n'))
  config.production = true
  config.cdnUrl = 'https://dico.rentberry.com'
  runSequence('clean', 'scripts', 'image', 'styles', 'bundle-libraries', 'html', 'fonts', 'downloads', buildLanguages())

})
