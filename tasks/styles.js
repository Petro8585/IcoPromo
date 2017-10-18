/*===========================================================
 GULP : APP TASKS :: CSS & SASS -- minify, concat
===========================================================*/
var gulp = require('gulp'),
  config = require('./config'),
  gulpIf = require('gulp-if'),
  gulploadPlugins = require('gulp-load-plugins'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  urlAdjuster = require('gulp-css-url-adjuster'),
  hash = require('gulp-hash-filename')
  revUrls = require('gulp-rev-urls')

var plugins = gulploadPlugins()

var callback = function (err) {
  console.log(config.notify.error('\n--------- SASS file has error clear it to see changes, check the log below -------------\n'))
  console.log(err)
}

gulp.task('styles', function () {
  console.log(config.notify.update('\n--------- Running CSS tasks --------------------------------------------\n'))
  return gulp.src(['app/scss/master.scss'])
    .pipe(gulpIf(!config.production, sourcemaps.init()))
    .pipe(plugins.sass({onError: callback}))
    .pipe(plugins.size())
    .pipe(gulpIf(config.production, revUrls(config.urlOptions)))
    .pipe(autoprefixer({
      browsers: config.browserVersion,
      cascade: false
    }))
    .pipe(gulpIf(config.production, urlAdjuster({
      prepend: config.stylePrepend || '/'
    })))
    .pipe(gulpIf(config.production, plugins.minifyCss()))
    .pipe(plugins.concat('master.css'))
    .pipe(gulpIf(config.production, hash()))
    .pipe(gulpIf(!config.production, sourcemaps.write('./')))
    .pipe(plugins.size())
    .pipe(gulp.dest(config.build.css))
})
