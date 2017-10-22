/*===========================================================
 GULP : APP TASKS :: HTML -- Minify html to build
===========================================================*/
var gulp = require('gulp'),
  gulpIf = require('gulp-if'),
  gulploadPlugins = require('gulp-load-plugins'),
  markdown = require('markdown'),
  assetpaths = require('gulp-assetpaths'),
  inject = require('gulp-inject'),
  revUrls = require('gulp-rev-urls'),
  fs = require('fs')

var plugins = gulploadPlugins()
var config = require('./config')

var getData = function (filename) {
  var jsonData = fs.readFileSync(__dirname + '/../app/data/' + config.lang + '/' + filename, 'utf8')
  return JSON.parse(jsonData)
}

gulp.task('html', function () {

  console.log(config.notify.update('\n--------- Running HTML ' + config.lang.toUpperCase() + ' tasks ------------------------------------------\n'))
  return gulp.src([config.source.root + '/*.html'])
    .pipe(plugins.fileInclude({
      prefix: '@',
      basepath: '@file',
      filters: {
        markdown: markdown.parse
      },
      context: {
        env: config.env || 'dev',
        lang: config.lang,
        whyRentberry: getData('whyRentberry.json'),
        header: getData('header.json'),
        firstScreen: getData('first-screen.json'),
        about: getData('about.json'),
        icoDetails: getData('ico-details.json'),
        whitepaper: getData('whitepaper.json'),
        partners: getData('partners.json'),
        roadshow: getData('roadshow.json')
      }
    }))
    .pipe(gulpIf(config.production, revUrls(config.urlOptions)))
    .pipe(inject(
      gulp.src(
        config.build.js + '/bower*.js',
        {read: false}
      ),
      {name: 'bower', ignorePath: 'build'}
    ))
    .pipe(inject(
      gulp.src(
        [
          config.build.js + '/*.js', '!' + config.build.js + '/bower*.js',
          config.build.css + '/*.css'
        ],
        {read: false}
      ),
      {ignorePath: 'build'}
    ))
    .pipe(gulpIf(config.production, assetpaths({
      newDomain: config.cdnUrl + '/images',
      oldDomain: '/images',
      filetypes: ['jpg', 'jpeg', 'png', 'svg', 'gif', 'favicon.ico'],
      customAttributes: ['srcset'],
      docRoot: ''
    })))
    .pipe(gulpIf(config.production, assetpaths({
      newDomain: config.cdnUrl + '/css',
      oldDomain: '/css',
      filetypes: ['css'],
      docRoot: ''
    })))
    .pipe(gulpIf(config.production, assetpaths({
      newDomain: config.cdnUrl + '/downloads',
      oldDomain: '/downloads',
      filetypes: ['pdf'],
      docRoot: ''
    })))
    .pipe(gulpIf(config.production, assetpaths({
      newDomain: config.cdnUrl + '/js',
      oldDomain: '/js',
      filetypes: ['js'],
      docRoot: ''
    })))
    .pipe(gulpIf(config.production, plugins.minifyHtml(config.opts)))
    .pipe(plugins.size())
    .pipe(gulp.dest(config.build.root))
})
