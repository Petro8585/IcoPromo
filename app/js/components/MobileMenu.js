'use strict'

var MobileMenu = function (openEl, closeEl, menuEl) {
  this.openEl = $(openEl)
  this.closeEl = $(closeEl)
  this.menuEl = $(menuEl)

  this.openMenu = this.openMenu.bind(this)
  this.closeMenu = this.closeMenu.bind(this)

  this.init()
}

MobileMenu.prototype = {
  openMenu: function () {
    this.openEl.fadeOut(200)
    this.menuEl.addClass('opened').fadeIn(200)
    $('body')
      .addClass('stop-scrolling')
      .bind('touchmove', function(e){e.preventDefault()})
  },
  closeMenu: function () {
    this.menuEl.fadeOut(200)
    this.openEl.removeClass('opened').fadeIn(200)
    $('body')
      .removeClass('stop-scrolling')
      .unbind('touchmove')
  },
  init: function () {
    isMobile(function (mobile) {
      if(mobile) {
        this.openEl.show()
        this.menuEl.removeClass('opened').hide()
        this.openEl.bind('click', this.openMenu)
        this.closeEl.bind('click', this.closeMenu)
      } else {
        this.openEl.hide()
        this.menuEl.show()
        $('body')
          .removeClass('stop-scrolling')
          .unbind('touchmove')
        this.openEl.unbind('click', this.openMenu)
        this.closeEl.unbind('click', this.closeMenu)
      }
    }.bind(this))
  }
}
