'use strict'

$('#emailVerified').iziModal({
  openFullscreen: true,
  bodyOverflow: true,
  closeButton: true,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
  focusInput: false,
  onClosing: function () {
    $('body').removeClass('modal-opened')
  },
  onOpening: function () {
    $('body').addClass('modal-opened')
  }
})

if (window.url.registration === 'true') {
  history.pushState(null, null, '/')
  $('#stayUpdated').iziModal('open')
}
else if (window.url.verification) {
  var onSuccess = function () {
    $('#emailVerified').iziModal('open')

    history.pushState(null, null, '/')
  }
  var onError = function () {
    console.log('ERROR verify')
  }

  var url = 'https://ico.rentberry.com/api/registration/verify/' + window.url.verification
  $.ajax({
    url: url,
    type: 'GET',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    success: onSuccess,
    error: onError
  })
}
