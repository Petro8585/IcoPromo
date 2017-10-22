'use strict'

/**
 * Dropdown
 *
 * Main usage:
 *   new Dropdown(toggle, menu)
 *
 * @param toggle - element selector
 * @param menu - element selector
 * @constructor
 */
var Dropdown = function (toggle, menu) {
  this.toggle = $(toggle)
  this.menu = $(menu)
  this.closeMenu = this.closeMenu.bind(this)

  this.init()
}

Dropdown.prototype = {

  closeMenu: function () {
    this.menu.fadeOut(200)
    $(document).unbind('click', this.closeMenu)
  },

  /**
   * @param e - mouseEvent
   */
  openMenu: function (e) {
    e.stopPropagation()
    if (this.menu.is(':hidden')) {
      this.menu.fadeIn(200)
      $(document).bind('click', this.closeMenu)
    }
    else {
      this.closeMenu()
    }
  },

  init: function () {
    this.toggle.click(this.openMenu.bind(this))
  }
}
