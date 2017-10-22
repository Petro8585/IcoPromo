'use strict'

/**
 * Timer
 *
 * Main usage:
 *  new Timer(selector, endTime)
 *
 * @param selector - element selector
 * @param endTime - Date
 * @constructor
 */
var Timer = function (selector, endTime) {
  this.el = $(selector)
  this.daysElement = this.el.find('.timer-days')
  this.hoursElement = this.el.find('.timer-hours')
  this.minElement = this.el.find('.timer-min')
  this.secElement = this.el.find('.timer-sec')
  this.dateStartElement = this.el.find('.timer-head-date')
  this.setEndTime(endTime)

  this.init()
}

Timer.prototype = {

  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  /**
   * @param value - number
   * @returns {*}
   */
  formatValue: function (value) {
    if (value < 10 && value >= 0) {
      value = '0' + value
    }
    return value
  },

  /**
   * @param left - number
   */
  setDays: function (left) {
    var daysCount = Math.floor(left / 8.64e+7)
    if (this.prevDays && this.prevDays === daysCount) { return }
    this.daysElement.text(this.formatValue(daysCount))
    this.prevDays = daysCount
  },

  /**
   * @param left - number
   */
  setHours: function (left) {
    var hoursCount = Math.floor((left / (1000 * 60 * 60)) % 24)
    if (this.prevHours && this.prevHours === hoursCount) { return }
    this.hoursElement.text(this.formatValue(hoursCount))
    this.prevHours = hoursCount
  },

  /**
   * @param left - number
   */
  setMin: function (left) {
    var minCount = Math.floor(((left / (1000 * 60)) % 60))
    if (this.prevMin && this.prevMin === minCount) { return }
    this.minElement.text(this.formatValue(minCount))
    this.prevMin = minCount
  },

  /**
   * @param left - number
   */
  setSec: function (left) {
    var secCount = Math.floor((left / 1000) % 60)
    this.secElement.text(this.formatValue(secCount))
  },

  updateTimer: function () {
    var currentTime = Date.now()
    var left = this.endTime - currentTime
    this.setDays(left)
    this.setHours(left)
    this.setMin(left)
    this.setSec(left)
  },

  /**
   * @param endTime - Date
   */
  setEndTime: function (endTime) {
    var prevEndTime = this.endTime
    this.endTime = endTime.getTime() - endTime.getTimezoneOffset() * 60 * 1000
    if (prevEndTime === this.endTime) { return }
    var month = this.monthNames[endTime.getMonth()]
    var date = endTime.getDate()
    this.dateStartElement.text(month + ' ' + date)
  },

  init: function () {
    this.updateTimer()
    setInterval(this.updateTimer.bind(this), 1000)
  }
}
