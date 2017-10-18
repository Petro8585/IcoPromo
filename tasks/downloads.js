/*===========================================================
 GULP : APP TASKS :: DOWNLOADS
===========================================================*/
var gulp = require('gulp'),
  gulploadPlugins = require('gulp-load-plugins')

var plugins = gulploadPlugins()
var config = require('./config')

gulp.task('downloads', function () {

  console.log(config.notify.update('\n--------- Running Downloads tasks --------------------------------------------\n'))
  return gulp.src([config.source.downloads + '/*.*', config.source.downloads + '/**/*.*'])
    .pipe(plugins.size())
    .pipe(gulp.dest(config.build.downloads))
})
