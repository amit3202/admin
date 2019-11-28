var Cryptr = require('cryptr');
var cryptr = new Cryptr('3202');
// var fns = require('date-fns')
// console.log(fns.compareAsc(fns.parseISO('2019-09-25T06:28:18.773+00:00'),new Date()))
// var _ = require('lodash')
// var arr = [{name : 'Amit'},{name :'ram'}];
// console.log(_.keyBy(arr,'name'))

// var express = require('express')

// const app = new express();

// app.use((req,res,next)=>{

//     console.log('test')
//     next()
// })

// app.use((req,res,next)=>{

//     console.log('test 2')
//     next()

// })

// app.get('/home',(req,res)=>{

//     res.send('ttt')

// })

// app.listen(3000,()=>{
//     console.log('serever')
// })

function getRoomDetail(userArray){

    userArray.sort();
    var roomid = cryptr.encrypt(str);
    return roomid;
}

function getUserDetail(roomid,loggedInUser)
{
   // var loggedInUser = '5d8dbcf293caee2eb511b9bc';
    var otherId =cryptr.decrypt(roomid).split(',').filter((id)=>{
        if(id != loggedInUser){
            return true;
        }
    }).toString()
    return {
        loggedInUser,otherId
    }

}
var str = ['5d8dbcf293caee2eb511b9bc','5d8dba763fb2ce2d5fb07c18'];

console.log(getUserDetail(getRoomDetail(str)))


