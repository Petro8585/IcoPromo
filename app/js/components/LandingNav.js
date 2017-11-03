'use strict'

/**
 * LandingNav
 *
 * Main usage:
 *  new LandingNav(selector)
 *
 * @param selector - element selector
 * @constructor
 */
var LandingNav = function (selector) {
  this.nav = $(selector)
  this.links = this.nav.find('.links-wrapper a')
  this.marker = this.nav.find('.marker')
  this.sections = this.links
    .map(function () {
      return $(this.getAttribute('href'))
    })

  this.mobileMenu = new MobileMenu('#menu-toggle', '.menu-close, #app-nav .stay-updated-btn', '#app-nav')
  this.init()
}
LandingNav.prototype = {

  changeActive: function () {
    if (!this.active) { return }
    this.links.removeClass('active')
    this.active.addClass('active')
  },

  removeAllActive: function () {
    this.links.removeClass('active')
    this.marker.hide()
  },

  /**
   * @param withoutTransition - bool
   */
  updateMarkerPosition: function (withoutTransition) {
    if (!this.active || this.mobile) { return }
    if (withoutTransition) {
      this.marker.css('transition', 'none')
    }
    this.marker.css({
      left: this.active.position().left + parseInt(this.active.css('margin-left')) + 'px',
      width: this.active.outerWidth()
    })
    this.marker.show()

    if (withoutTransition) {
      this.marker.css('transition', '.3s ease')
    }
  },

  addListeners: function () {
    var timeout = 0
    this.links.click(function (e) {
      e.preventDefault()

      if(this.mobile) {
        timeout = 400
        this.mobileMenu.closeMenu(e)
      }

      setTimeout(function(){
        var section = $(e.target.getAttribute('href'))

        $('html, body').animate({
          scrollTop: section.offset().top - this.navHeight + 6
        }, this.scrollAnimationTime)
      }.bind(this), timeout)
    }.bind(this))
  },

  init: function () {
    isMobile(function (mobile) {
      this.navHeight = mobile ? 50 : 80
      this.scrollAnimationTime = mobile ? 0 : 500
      this.mobile = mobile
    }.bind(this))
    var checkActive = (function () {
      var timeout
      return function () {
        if (timeout) { clearTimeout(timeout) }
        timeout = setTimeout(function () {
          var scrollTop = $(document).scrollTop() + this.navHeight
          var activeSection = this.sections
            .filter(function () {
              if (!this.length) { return false }
              return this.offset().top - scrollTop <= 0
            })
            .sort(function (a, b) {
              if (a.data().order < b.data().order) { return 1 }
              if (a.data().order > b.data().order) { return -1 }
              return 0
            })[0]
          if (!activeSection || !activeSection.length) { return this.removeAllActive() }
          this.active = $('[href="#' + activeSection[0].id + '"]')
          this.changeActive()
          this.updateMarkerPosition()
        }.bind(this), 10)
      }.bind(this)
    }.bind(this))()

    this.addListeners()

    $(window).resize(this.updateMarkerPosition.bind(this, true))

    $(document).scroll(checkActive)
  }
}
