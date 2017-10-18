/*===========================================================
 GULP: APP TASKS :: Images minification
===========================================================*/
var gulp = require('gulp'),
  gulploadPlugins = require('gulp-load-plugins'),
  gulpIf = require('gulp-if'),
  RevAll = require('gulp-rev-all')

var plugins = gulploadPlugins()
var config = require('./config')

gulp.task('image', function () {

  console.log(config.notify.update('\n--------- Image Minification --------------------------------------------\n'))
  return gulp.src([config.source.images + '/*.*', config.source.images + '/**/*.*'])
    .pipe(gulpIf(config.production, RevAll.revision({
      includeFilesInManifest: ['.jpg', '.jpeg', '.png', '.svg', '.gif', '.ico'],
      dontRenameFile: [/\/email\//g]
    })))
    .pipe(gulp.dest(config.build.images))
    .pipe(gulpIf(config.production, RevAll.manifestFile()))
    .pipe(gulp.dest(config.build.images))
})
