'use strict'

/**
 * MobileMenu
 *
 * Main usage:
 *  new MobileMenu(openEl, closeEl, menuEl)
 *
 * @param openEl - element selector
 * @param closeEl - element selector
 * @param menuEl - element selector
 * @constructor
 */
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
    this.scrollTop = $(document).scrollTop()

    this.openEl.fadeOut(200)
    this.menuEl.addClass('opened').fadeIn(200)

    $('body')
      .css({
        'top': - this.scrollTop + 'px'
      })
      .addClass('menu-opened')
  },

  closeMenu: function (e) {
    this.menuEl.fadeOut(200)
    this.openEl.removeClass('opened').fadeIn(200)

    $('body')
      .removeClass('menu-opened')
      .css({
        'top': ''
      })

    if(e.target.className === 'menu-close' || e.target.id === 'registerNowMobileHeaderBtn') {
      $(document).scrollTop(this.scrollTop || 0)
    }
  },

  init: function () {
    isMobile(function (mobile) {
      if (mobile) {
        this.openEl.show()
        this.menuEl.removeClass('opened').hide()
        $('body').removeClass('menu-opened')
        this.openEl.bind('click', this.openMenu)
        this.closeEl.bind('click', this.closeMenu)
      }
      else {
        this.openEl.hide()
        this.menuEl.show()
        $('body').removeClass('menu-opened')
        this.openEl.unbind('click', this.openMenu)
        this.closeEl.unbind('click', this.closeMenu)
      }
    }.bind(this))
  }
}
