'use strict'

/**
 * isMobile - singleton to receive current device resolution
 *
 * Main usage:
 *  var subscription = dataLoader(cb) - cb will be called when device resolution changes
 *  subscription.unsubscribe() - to unsubscribe from updates
 */
var isMobile = (function () {
  var listeners = []
  var nextId = 0
  var checkMobile = function () {
    return $(window).width() < 768
  }
  var prevMobile = checkMobile()
  var currentMobile = checkMobile()

  $(window).resize(function () {
    prevMobile = currentMobile
    currentMobile = checkMobile()
    if (currentMobile && !prevMobile || !currentMobile && prevMobile) {
      listeners.forEach(function (t) { t.cb(currentMobile) })
    }
  })

  /**
   * Subscription
   *
   * @param cb - function
   * @constructor
   */
  var Subscription = function (cb) {
    this.id = ++nextId
    this.cb = cb
    this.cb(currentMobile, prevMobile)
    listeners.push(this)
  }

  Subscription.prototype = {
    unsubscribe: function () {
      var index = listeners.findIndex(function (item) {
        return item.id === this.id
      }.bind(this))
      if (!index) { return }
      listeners.splice(index, 1)
    }
  }
  return function (cb) {
    return new Subscription(cb)
  }
})()
