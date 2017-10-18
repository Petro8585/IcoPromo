'use strict'

function formatNumber (num) {
  var arr = []
  var str = num
    .toString()
    .split('')
    .reverse()
    .join('')

  for (var i = 0; i < str.length; i += 3) {
    arr.push(str.slice(i, i + 3))
  }

  return arr
    .join(',')
    .split('')
    .reverse()
    .join('')
}
