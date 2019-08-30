var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var route_dir = path.resolve(__dirname,'');
const init = (server)=>{
    console.log('route initiated')
    // merge Routes //
    var allRoutes = [];
    fs.readdirSync(route_dir).forEach((filename)=>{
        
        var file = filename.substring(0,filename.indexOf("."));
            if(file != 'route'){
                allRoutes[file] = require(route_dir+"/"+filename);
                allRoutes[file](router);
            }
            

    });

    server.use(router)


}

module.exports = init;




