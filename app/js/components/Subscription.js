'use strict'

$.validate({
  form: '#subscriptionForm',
  validateOnBlur: false,
  scrollToTopOnError: false
})

$('#subscriptionForm').submit(function (event) {
  event.preventDefault()

  var url = 'https://ico.rentberry.com/api/newsletter/'
  var email = $('input[name="email"]').val()
  var data = 'email=' + encodeURIComponent(email)
  var onSuccess = function () {
    $('#subscription').addClass('show-result')
  }
  var onError = function () {
    console.log('ERROR')
  }

  $.ajax({
    url: url,
    type: 'POST',
    data: data,
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    success: onSuccess,
    error: onError
  })
})
