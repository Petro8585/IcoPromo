'use strict'

/**
 * CommittedProgress
 *
 * Main usage:
 *  new CommittedProgress(selector, max-progress)
 *
 * @param selector - element selector
 * @param maxProgress - number
 * @constructor
 */
var CommittedProgress = function (selector, maxProgress) {
  this.el = $(selector)
  this.progressEl = this.el.find('.commit-progress-value')
  this.sumEl = this.el.find('.sum')
  this.maxProgress = maxProgress || 30000000
  this.step = 0

  this.init()
}

CommittedProgress.prototype = {

  /**
   * @param val - current progress value
   */
  updateProgress: function (val) {
    var currentProgress = val / (this.maxProgress / 100)
    this.progressEl.css({
      minWidth: currentProgress + '%'
    })
  },

  /**
   * @param val - current committed value
   */
  updateSum: function (val) {
    var formattedValue = '$' + formatNumber(val)
    this.sumEl.text(formattedValue)
  },

  init: function () {
    var updateAll = function (data) {
      var val = data.money
      if (this.prevVal && this.prevVal === val) { return }
      this.maxProgress = val + this.step > this.maxProgress ? this.maxProgress + this.step : this.maxProgress
      this.updateProgress(val)
      this.updateSum(val)
      this.prevVal = val
    }.bind(this)
    dataLoader(updateAll)
  }
}
