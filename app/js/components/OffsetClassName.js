'use strict'

var OffsetClassName = function (element, className, offset, offsetMobile) {
  this.el = $(element)
  this.className = className
  this.offset = offset
  this.offsetMobile = offsetMobile

  this.init()
  this.toggleClass()
}

OffsetClassName.prototype = {
  toggleClass: function () {
    var scrollTop = $(document).scrollTop()
    if (!this.mobile && scrollTop > this.offset || this.mobile && scrollTop > this.offsetMobile) {
      if (this.el.hasClass(this.className)) { return }
      this.el.addClass(this.className)
    } else {
      if (!this.el.hasClass(this.className)) { return }
      this.el.removeClass(this.className)
    }
  },
  init: function () {
    isMobile(function (mobile) {
      this.mobile = mobile
      this.toggleClass()
    }.bind(this))
    $(document).scroll(this.toggleClass.bind(this))
  }
}
