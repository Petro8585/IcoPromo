'use strict'

var BonusList = function (selector, configs) {
  this.el = $(selector)
  this.configs = configs

  this.init()
}

BonusList.prototype = {
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
      $(this).find('.progress').text('+' + Math.round(stepValue * 100) + '%')
    })
  },
  init: function () {
    var listener = function () {
      if($(document).scrollTop() + $(window).height() >= this.el.offset().top) {
        $(document).unbind('scroll', listener)
        this.configs.forEach(this.createCircle.bind(this))
      }
    }.bind(this)

    listener()
    $(document).bind('scroll', listener)
  }
}
