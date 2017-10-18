'use strict'

var SlowScroll = function (selector, speed, start, startPointOffset) {
  this.el = $(selector)
  this.speed = speed
  this.startPointOffset = startPointOffset || 0
  this.start = start
  this.prevTransform = 0
  this.el.addClass('will-change')
}

SlowScroll.prototype = {
  reset: function () {
    this.el.css('transform', 'translateY(0px)')
  },
  calcOffset: function (scrollTop, windowHeight, ignorePosition) {
    var scrollBottom = scrollTop + windowHeight
    var elScrollTop = this.el.offset().top - this.prevTransform
    var elHeight = this.el.outerHeight()
    var startPoint = elScrollTop + elHeight - this.startPointOffset
    var currentSpeed = scrollBottom >= startPoint ? this.speed : 0
    var top

    if (this.start) {
      top = +((scrollBottom - startPoint) * currentSpeed).toFixed(3)
    }
    else {
      top = +(scrollTop * this.speed).toFixed(3)
    }
    var fixedOnPlaceholder = top > windowHeight || top < -elHeight
    if (fixedOnPlaceholder && this.currentlyFixedOnPlaceholder && !ignorePosition) { return }
    this.currentlyFixedOnPlaceholder = fixedOnPlaceholder
    var translate = 'translate(0px, ' + top + 'px)'
    this.el.css({
      '-webkit-transform': translate,
      '-moz-transform': translate,
      '-ms-transform': translate,
      '-o-transform': translate,
      'transform': translate
    })
    this.prevTransform = top
  }
}

var manageSlowScrolls = function (slowScrolls) {
  var prevMobile, currentMobile, request

  var requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }

  var cancelAnimationFrame = window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout

  var update = function () {
    if (currentMobile) { return cancelAnimationFrame(request) }

    var scrollTop = $(document).scrollTop()
    var windowHeight = $(window).innerHeight()
    var ignorePosition = prevMobile && !currentMobile

    slowScrolls.forEach(function (t) {
      t.calcOffset(scrollTop, windowHeight, ignorePosition)
    })

    request = requestAnimFrame(update)
  }

  isMobile(function (current, prev) {
    currentMobile = current
    prevMobile = prev
    if (!currentMobile) {
      request = requestAnimFrame(update)
      return
    }
    slowScrolls.forEach(function (t) {
      t.reset()
    })
  })
}
