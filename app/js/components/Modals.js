'use strict'

var defaultForm

/**
 * @param event - form submit event
 */
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
    $('.registration-form-server-error').fadeIn()
    setTimeout(function () {
      $('.registration-form-server-error').fadeOut()
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


var fixInput = (function () {
  var scrollTop
  var body = $('body')
  var onResize = function(){
    body.css('height', window.innerHeight + 'px');
  }

  return {
    open: function() {
      scrollTop = $(document).scrollTop()
      setTimeout(function() {
        body.css({
          'height': window.innerHeight + 'px',
          'overflow': 'hidden'
        });
        $(window).bind('resize', onResize)
      }.bind(this))
    },
    close: function() {
      body.css({
        'height': '',
        'overflow': ''
      })

      $(document).scrollTop(scrollTop || 0)
      $(window).unbind('resize', onResize)
    }
  }
})()

$('#stayUpdated').iziModal({
  openFullscreen: true,
  bodyOverflow: true,
  closeButton: true,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
  focusInput: false,
  onOpened: onOpened,
  onClosed: onClosed,
  onClosing: function () {
    fixInput.close()
    onClosing()
  },
  onOpening: function () {
    fixInput.open()
    onOpening()
  }
})

$('.stay-updated-btn').click(function () {
  isMobile(function(mobile){
      if(mobile) {
        setTimeout(function() {
          $('#stayUpdated').iziModal('open')
        }.bind(this))
      } else {
        $('#stayUpdated').iziModal('open')
      }
    }.bind(this))
})

$('.currency').blur(function () {
  if ($(this).val() === '$' || !$(this).val()) {
    $(this).val('')
  }
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

$('#roadshowModal').iziModal({
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

$('.open-photo').click(function (e) {
  $('#modalGallery').iziModal('open')
  $(".modal-slider").slick('slickGoTo', e.target.dataset.index - 1);
})

$('#modalGallery').iziModal({
  openFullscreen: true,
  bodyOverflow: true,
  closeButton: true,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
  onClosing: function () {
    $('body').removeClass('modal-opened')

    var currentSlide = $('.modal-slider').slick('slickCurrentSlide');
    $('.simple-slider').slick('slickGoTo', currentSlide);
  },
  onOpening: function () {
    $('body').addClass('modal-opened')
  }
})

// set data-lazy path for image with hash
var modalSlider = function () {
  this.images = $('#modalGallery img[data-src]')

  this.init()
}

modalSlider.prototype = {
  init: function () {

    this.images.each(function (index, img) {

      var src = img.getAttribute('data-src')

      img.setAttribute('data-lazy', src)
      img.onload = function () {
        img.removeAttribute('data-src')
      }
    })

    $(".modal-slider").slick({
      lazyLoad: 'ondemand',
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 300,
      swipe: false,
      fade: true,
      infinite: false
    })
  }
}



