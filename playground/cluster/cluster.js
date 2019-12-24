var express = require('express');
var app = express();
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
let workers = [];
function masterProcess(){

    console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);

    const worker = cluster.fork();
    workers.push(worker);

    // Listen for messages from worker
    worker.on('message', function(message) {
      console.log(`Master ${process.pid} recevies message '${JSON.stringify(message)}' from worker ${worker.process.pid}`);
    });
  }

  // Send message to the workers
  workers.forEach(function(worker) {
    console.log(`Master ${process.pid} sends message to worker ${worker.process.pid}...`);
    worker.send({ msg: `Message from master ${process.pid}` });    
  }, this);

}

function childProcess() {
    
    process.on('message', function(message) {
        console.log(`Worker ${process.pid} recevies message '${JSON.stringify(message)}'`);
      });
    
      console.log(`Worker ${process.pid} sends message to master...`);
      process.send({ msg: `Message from worker ${process.pid}` });
    
      console.log(`Worker ${process.pid} finished`);

}

if(cluster.isMaster){

    masterProcess();

}else{
    console.log('worker')
    childProcess();
}
