'use strict'

var dataLoader = (function () {
  var listeners = []
  var nextId = 0
  var defaultData = {
    participants: 1307,
    countries: 53,
    money: 17138376,
    releaseDate: 1511175600000
  }
  var data = JSON.parse(localStorage.getItem('saved_statistic')) || defaultData

  var updateListeners = function () {
    listeners.forEach(function (t) { t.cb(data) })
  }

  updateListeners()

  var config = {
    apiKey: "AIzaSyBYzdxri6xHy9_74RidjVZtpLpXqQ8x1Fo",
    authDomain: "jovial-lamp-163411.firebaseapp.com",
    databaseURL: "https://jovial-lamp-163411.firebaseio.com",
    projectId: "jovial-lamp-163411"
  };

  firebase.initializeApp(config);
  var env = $('body').data('env')
  var databaseRef = firebase.database().ref('/' + env)
  databaseRef.on('value', function (dataSnapshot) {
    data = dataSnapshot.val()
    localStorage.setItem('saved_statistic', JSON.stringify(data))
    updateListeners()
  })

  var Subscription = function (cb) {
    this.id = ++nextId
    this.cb = cb
    this.cb(data)
    listeners.push(this)
  }

  Subscription.prototype = {
    unsubscribe: function () {
      var id = this.id
      var index = listeners.findIndex(function (item) {
        return item.id === id
      })
      if (!index) { return }
      listeners.splice(index, 1)
    }
  }
  return function (cb) {
    return new Subscription(cb)
  }
})()
