var chalk = require('chalk')

/*-----------------------------------------------------------
 GULP: APP CONFIGURATION
 Source, Build folder and other application configuration
-----------------------------------------------------------*/
var config = function () {

  // Source Path
  var src = {
    root: 'app',
    css: 'app/css',
    scss: 'app/scss',
    js: 'app/js',
    images: 'app/images',
    fonts: 'app/fonts',
    bower: './bower_components',
    zip: './zip',
    downloads: 'app/downloads'
  }

  // Build Path
  var build = {
    root: 'build',
    css: 'build/css',
    js: 'build/js',
    images: 'build/images',
    fonts: 'build/fonts',
    downloads: 'build/downloads'
  }

  // Server Configuration
  var serverConfiguration = {
    host: 'localhost',
    port: 3000,
    open: true,
    livereload: {
      enable: true,
      port: 35729
    }
  }

  // Default production mode set to false
  var production = false

  // Bower Configuration
  var bowerConfiguration = {
    paths: {
      bowerDirectory: src.bower,
      bowerrc: '.bowerrc',
      bowerJson: 'bower.json'
    }
  }

  // Minification options for HTML
  var opts = {
    comments: false,
    quotes: true,
    spare: true,
    empty: true,
    cdata: true
  }

  // Chalk config
  var notify = {
    error: chalk.red.bold,
    warning: chalk.black.bold.bgYellow,
    update: chalk.yellow.underline,
    success: chalk.green
  }

  // CSS autoprefix config
  var browserVersion = ['> 1%']

  var urlOptions = {
    manifest: build.images + '/rev-manifest.json',
    pattern: /(?:url\(["']?(.+?)['"]?\)|\s?(?:src|href|srcset)=["']?(.+?)['"])/g,
    transform: function (obj, key, val, settings) {
      if(~key.indexOf('@2x')) {
        val = val + ' 2x'
      }
      obj['/images/' + key] = '/images/' + val;
    },
    revise: function (origUrl, fullUrl, manifest) {
      if (~origUrl.indexOf(' 2x')) {
        var newUrl = origUrl.replace(' 2x', '')
        return manifest[newUrl] || origUrl
      }
      return manifest[origUrl] || origUrl;
    }
  }

  return {
    source: src,
    build: build,
    serverConfiguration: serverConfiguration,
    production: production,
    bowerConfiguration: bowerConfiguration,
    opts: opts,
    notify: notify,
    browserVersion: browserVersion,
    urlOptions: urlOptions,
    lang: 'en',
    // languages: ['zh', 'ja', 'ko', 'ru', 'es']
    languages: []
  }
}

module.exports = config()
