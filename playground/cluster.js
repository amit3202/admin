var numCpus = require('os').cpus().length;
var express =  require('express');
var app = express();
var cluster = require('cluster')

if(cluster.isMaster){
    console.log(`CPU length is ${numCpus}`)
    for(let i=0;i<numCpus;i++){

        cluster.fork();

    }

    cluster.on('online',(worker)=>{

        console.log(`Worker ${ worker.process.pid } is online`)

    })

    cluster.on('exit',(worker,code,signal)=>{

        console.log(`worker ${worker.process.pid} exist at ${code} with signal ${signal}`)
        console.log('Starting new worker')
        cluster.fork();
        

    })

    cluster.on('message',(worker,message)=>{

        console.log(`message ${message}`)

    })

}else{

    app.get('/home',(req,res,next)=>{
       
        res.send({test :'d'})

    })

    app.listen('2323',()=>{
        console.log('on ports 2323')
    })

}


