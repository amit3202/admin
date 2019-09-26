
// var fns = require('date-fns')
// console.log(fns.compareAsc(fns.parseISO('2019-09-25T06:28:18.773+00:00'),new Date()))
var _ = require('lodash')
var arr = [{name : 'Amit'},{name :'ram'}];
console.log(_.keyBy(arr,'name'))
