'use strict'

$(document).ready(function () {
  var defaultForm
  var onSubmit = function (event) {
    event.preventDefault()

    var url = 'https://ico.rentberry.com/api/registration/'

    var nameFirst = encodeURIComponent($('input[name="nameFirst"]').val())
    var nameLast = encodeURIComponent($('input[name="nameLast"]').val())
    var username = encodeURIComponent($('input[name="username"]').val())
    var amount = encodeURIComponent($('input[name="amount"]').val())

    var data = 'nameFirst=' + nameFirst + '&nameLast=' + nameLast + '&username=' + username + '&amount=' + amount

    var onSuccess = function () {
      $('#username').text('' + $('input[name="username"]').val() + '')
      $('#stayUpdated').addClass('show-result')
    }
    var onError = function () {
      $('#registrationForm .server-error').fadeIn()
      setTimeout(function () {
        $('#registrationForm .server-error').fadeOut()
      }, 3000)
    }

    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      success: onSuccess,
      error: onError
    })
  }

  var onOpening = function () {
    $('body').addClass('modal-opened')
  }

  var onOpened = function () {
    defaultForm = $('#registrationForm').clone()
    $.validate({
      form: '#registrationForm',
      validateOnBlur: true,
      scrollToTopOnError: false
    })
    $('.currency').inputmask({
      'groupSeparator': ',',
      'alias': 'numeric',
      'greedy': false,
      'autoGroup': true,
      'showMaskOnHover': false,
      'rightAlign': false,
      'prefix': '$',
      'clearIncomplete': true,
      'clearMaskOnLostFocus': true,
      'autoUnmask': true
    })
    $('#registrationForm').submit(onSubmit)
  }

  var onClosing = function () {
    $('body').removeClass('modal-opened')
  }

  var onClosed = function () {
    $('#registrationForm').replaceWith(defaultForm)
    $('#registrationForm')[0].reset()
  }

  $('#stayUpdated').iziModal({
    openFullscreen: true,
    bodyOverflow: true,
    closeButton: true,
    transitionIn: 'fadeIn',
    transitionOut: 'fadeOut',
    focusInput: false,
    onOpening: onOpening,
    onOpened: onOpened,
    onClosing: onClosing,
    onClosed: onClosed
  })

  $('.stay-updated-btn').click(function () {
    $('#stayUpdated').iziModal('open')
  })

  $('.currency').blur(function () {
    if ($(this).val() === '$' || !$(this).val()) {
      $(this).val('')
    }
  })
})

$('#video-modal').iziModal({
  openFullscreen: true,
  bodyOverflow: true,
  closeButton: true,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
  onClosing: function () {
    $('body').removeClass('modal-opened')
    $('#video-modal').find('iframe').attr('src', '')
  },
  onOpening: function () {
    $('body').addClass('modal-opened')
  }
})

$('.why-rentberry__content-videos-list-item .img, .our-mission-img').click(function () {
  var videoUrl = $(this).data().url
  $('#video-modal').find('iframe').attr('src', videoUrl)
  $('#video-modal').iziModal('open')
})
