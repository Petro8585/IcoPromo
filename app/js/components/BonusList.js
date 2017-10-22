'use strict'

/**
 * BonusList
 *
 * Main usage:
 *  new BonusList(selector, configs)
 *
 * @param selector - element selector
 * @param configs - optional configs
 * @constructor
 */
var BonusList = function (selector, configs) {
  this.el = $(selector)
  this.configs = configs

  this.init()
}

BonusList.prototype = {

  /**
   *
   * @param config - bonus list item configs
   */
  createCircle: function (config) {

    var circle = this.el.find(config.id)
      .circleProgress({
        value: config.value,
        size: 80,
        startAngle: Math.PI + Math.PI / 2,
        emptyFill: 'rgba(255, 255, 255, 0)',
        thickness: 10,
        fill: 'rgba(123, 83, 193, .64)'
      })
    circle.on('circle-animation-progress', function (event, progress, stepValue) {
      var percents = 0
      if(config.value !== 0.01) {
        percents = Math.round(stepValue * 1000) / 10
      }
      $(this).find('.progress').text(percents + '%')
    })
  },

  init: function () {
    var listener = function () {
      if ($(document).scrollTop() + $(window).height() >= this.el.offset().top) {
        $(document).unbind('scroll', listener)
        this.configs.forEach(this.createCircle.bind(this))
      }
    }.bind(this)

    listener()
    $(document).bind('scroll', listener)
  }
}
