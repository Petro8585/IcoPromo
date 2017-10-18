'use strict'
var Counters = function (participantsSelector, countriesSelector, moneySelector) {
  this.participantsEl = $(participantsSelector)
  this.countriesEl = $(countriesSelector)
  this.moneyEl = $(moneySelector)
  this.init()
}

Counters.prototype = {
  createPlaceholder: function (value) {
    return value.toString().replace(/[0-9]/g, '9')
  },
  updateEl: function (el, value, before) {
    var formatted = formatNumber(value)
    var placeholder = this.createPlaceholder(value)
    var formattedPlaceholder = formatNumber(placeholder)
    before = before || ''
    el.text(before + formatted)
    el.attr('data-placeholder', before + formattedPlaceholder)
  },
  init: function () {
    var updateData = function (data) {
      if(!this.prevData || this.prevData.participants !== data.participants) {
        this.updateEl(this.participantsEl, data.participants)
      }
      if(!this.prevData || this.prevData.countries !== data.countries) {
        this.updateEl(this.countriesEl, data.countries)
      }
      if(!this.prevData || this.prevData.money !== data.money) {
        this.updateEl(this.moneyEl, data.money, '$')
      }
      this.prevData = data
    }.bind(this)
    dataLoader(updateData)
  }
}
