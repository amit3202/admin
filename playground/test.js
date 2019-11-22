
// var fns = require('date-fns')
// console.log(fns.compareAsc(fns.parseISO('2019-09-25T06:28:18.773+00:00'),new Date()))
// var _ = require('lodash')
// var arr = [{name : 'Amit'},{name :'ram'}];
// console.log(_.keyBy(arr,'name'))

var express = require('express')

const app = new express();

app.use((req,res,next)=>{

    console.log('test')
    next()
})

app.use((req,res,next)=>{

    console.log('test 2')
    next()

})

app.get('/home',(req,res)=>{

    res.send('ttt')

})

app.listen(3000,()=>{
    console.log('serever')
})