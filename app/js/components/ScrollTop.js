'use strict'

var ScrollTop = function (selector) {
  this.el = $(selector)

  this.init()
}

ScrollTop.prototype = {
  scroll: function () {
    $('html, body').animate({
      scrollTop: 0
    }, this.animationTime)
  },
  init: function () {
    isMobile(function (mobile) {
      this.animationTime = mobile ? 0 : 500
    }.bind(this))
    this.el.click(function (e) {
      e.preventDefault()
      this.scroll()
    }.bind(this))
  }
}
