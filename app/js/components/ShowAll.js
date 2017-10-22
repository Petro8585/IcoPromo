'use strict'

/**
 * ShowAll
 *
 * Main usage:
 *  new ShowAll(selector, action, list)
 *
 * @param selector - element selector
 * @param action - element selector
 * @param list - element selector
 * @constructor
 */
var ShowAll = function (selector, action, list) {
  this.el = $(selector)
  this.images = $(selector + ' img[data-src]')
  this.action = this.el.find(action)
  this.list = this.el.find(list)

  this.init()
}

ShowAll.prototype = {

  openList: function () {

    this.images.each(function (index, img) {

      var src = img.getAttribute('data-src')
      var srcset = img.getAttribute('data-srcset')

      img.setAttribute('src', src)
      img.setAttribute('srcset', srcset)
      img.onload = function () {
        img.removeAttribute('data-src')
      }
    })

    var heightNow = this.list.outerHeight()
    var heightFull = this.list.css({height: 'auto'}).outerHeight()

    this.el.addClass('animate')

    this.list
      .css({height: heightNow})
      .animate({
        height: heightFull
      }, 400, function () {
        this.el
          .removeClass('closed')
          .removeClass('animate')
      }.bind(this))
    this.action.animate({
      opacity: 0,
      height: 0
    }, {
      duration: 400,
      progress: function () {
        $(document).scroll()
      },
      complete: function () {
        this.action.hide()
        $(document).scroll()
      }.bind(this)
    })
  },

  init: function () {
    this.action.click(this.openList.bind(this))
  }
}
