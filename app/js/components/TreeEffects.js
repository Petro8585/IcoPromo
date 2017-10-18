'use strict'

var TreeEffects = function (tree) {
  this.el = $(tree)
  this.leftCards = this.el.find('.left .roadmap-item-card')
  this.rightCards = this.el.find('.right .roadmap-item-card')
  this.showContainedCards = this.showContainedCards.bind(this)

  this.init()
}

TreeEffects.prototype = {
  hideCards: function () {
    this.leftCards.css({
      opacity: 0,
      left: '-50px'
    })
    this.rightCards.css({
      opacity: 0,
      right: '-50px'
    })
    this.leftCards.find('.tree-connect').css({width: 0})
    this.rightCards.find('.tree-connect').css({width: 0})
    this.visible = 0
  },
  showContainedCards: function () {
    var scrollTop = $(document).scrollTop()
    var windowHeight = $(window).innerHeight()
    var showContainedCard = function (i, card) {
      var cardOffset = $(card).offset().top
      var cardHeight = $(card).outerHeight()
      if (cardOffset + cardHeight / 2 <= scrollTop + windowHeight && !$(card).hasClass('animated')) {
        $(card).animate({
          opacity: 1,
          left: 0,
          right: 0
        }, 500)
        $(card).find('.tree-connect').animate({width: '115px', overflow: 'visible'}, 500)
        $(card).addClass('animated')
      }
    }.bind(this)

    $.each(this.leftCards, showContainedCard)
    $.each(this.rightCards, showContainedCard)
  },
  init: function () {
    this.hideCards()
    this.showContainedCards()
    $(document).scroll(this.showContainedCards)
  }
}
