'use strict'

var Animations = function () {
  this.items = $('[data-animate="true"]')
    .map(function (i, item) {
      var $item = $(item)
      var data = $item.data()
      return {
        el: $item,
        target: data.animateTarget ? $(data.animateTarget) : false
      }
    })
  this.listener = this.listener.bind(this)

  this.init()
}

Animations.prototype = {
  getVisibleItems: function (scrollTop, windowHeight) {
    return this.items.filter(function (index, item) {
      var elShowPoint = item.target ? item.target.offset().top : item.el.offset().top + item.el.outerHeight() / 2 - 50
      return elShowPoint < scrollTop + windowHeight
    })
  },
  getHiddenItems: function (scrollTop, windowHeight) {
    return this.items.filter(function (index, item) {
      var elShowPoint = item.target ? item.target.offset().top : item.el.offset().top + item.el.outerHeight() / 2 - 50
      return elShowPoint >= scrollTop + windowHeight
    })
  },
  showItems: function (items) {
    items.each(function (index, item) {
      var data = item.el.data()
      var delay = +data.animateDelay || 0
      setTimeout(function () {
        item.el.css({
          opacity: 1,
          transform: 'none',
          transition: data.transform || 'all .5s ease-out'
        })
      }, delay)
    })
  },
  listener: function () {
    var scrollTop = $(document).scrollTop()
    var windowHeight = $(window).outerHeight()
    var visibleItems = this.getVisibleItems(scrollTop, windowHeight)
    if (!visibleItems.length) return
    this.showItems(visibleItems)
    this.items = this.getHiddenItems(scrollTop, windowHeight)
    if (!this.items.length) {
      $(document).unbind('scroll', this.listener)
    }
  },
  init: function () {
    isMobile(function (mobile) {
      if(!mobile && this.items.length) {
        this.listener()
        $(document).bind('scroll', this.listener)
      } else {
        $(document).unbind('scroll', this.listener)
      }
    }.bind(this))
  }
}
