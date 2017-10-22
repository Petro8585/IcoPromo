'use strict'

/**
 * formatNumber
 *
 * @param num - number
 * @returns {string}
 */
function formatNumber (num, withLeft) {
  var arr = []
  var left = Math.floor(num % 1 * 100)
  left = left > 0 && left < 10 ? '0' + left : left
  var str = Math.floor(num)
    .toString()
    .split('')
    .reverse()
    .join('')

  for (var i = 0; i < str.length; i += 3) {
    arr.push(str.slice(i, i + 3))
  }

  var result =  arr
    .join(',')
    .split('')
    .reverse()
    .join('')

  return left && withLeft ? result + '.' + left : result
}
