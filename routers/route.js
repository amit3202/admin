var express = require('express');
var errorRoute = require('./error');
var fs = require('fs');
var path = require('path');
var route_dir = path.resolve(__dirname,'./');
var route_path = path.resolve(__dirname,'./');
var async = require('async');


const init = (server,serverInstance)=>{ //Server instance for io

    // merge Routes //
   
    async.waterfall([
        (callback)=>{
            
            let path_array = [];
            fs.readdirSync(route_dir,{withFileTypes:true}).forEach((fd)=>{

                if(fd.isDirectory())
                {
                   // console.log(route_dir,fd.name)
                    readAssignToRouter(route_dir,fd.name,(data)=>{
        
                        path_array.push(data)
        
                    })
                }else{
                    
                var file = fd.name.substring(0,fd.name.indexOf("."));
                if(file != 'route' && file != 'error'){

                path_array.push({dir : route_dir.replace(route_path,''),name : fd.name});
                
                }
               
                }
                
        
            });

            callback(null,path_array)


        }
    ],(err,res)=>{

       async.map(res,(data)=>{
            
            
            let route = require(route_path+data.dir+"/"+data.name)(serverInstance);
            server.use(data.dir,route)
            
        })

        server.use('*',errorRoute);



    })  
   
}

const readAssignToRouter = (dirPath,dirName,cb)=>{

  var dirPath = dirPath+"/"+dirName;

    fs.readdirSync(dirPath,{withFileTypes:true}).forEach((fd)=>{
      
        if(fd.isDirectory())
       {
          // console.log(route_dir,fd.name)
           readAssignToRouter(dirPath,fd.name,(data)=>{
           cb(data)
               
           })
       }else{

        cb({dir : dirPath.replace(route_path,''),name : fd.name})

       }       
            
       
            

    });
    

}

module.exports = init;




