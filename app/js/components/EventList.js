'use strict'

var EventList = function (selector) {
  this.el = $(selector)
  this.cities = this.el.find('.roadshow-city')
  this.events = this.el.find('.roadshow-events')

  this.init()
}

EventList.prototype = {
  toggleDesktop: function (e) {
    var id = e.target.id
    this.cities.removeClass('active')
    this.el.find('#' + id).addClass('active')
    this.el.find('.roadshow-events.active').removeClass('active')
    this.el.find('.roadshow-events.' + id).addClass('active')
  },
  toggleMobile: function (e) {
    var id = e.target.id
    var elToShow = this.el.find('.roadshow-events.' + id).clone()
    $('#roadshowModal')
      .find('.roadshow-events')
      .replaceWith(elToShow)
    $('#roadshowModal').iziModal('open')

  },
  init: function () {
    var mobile
    isMobile(function (state) {
      mobile = state
      if(mobile) return
      $('#roadshowModal').iziModal('close')
    })
    this.cities.click(function (e) {
      if(mobile) return this.toggleMobile(e)
      return this.toggleDesktop(e)
    }.bind(this))
  }
}
