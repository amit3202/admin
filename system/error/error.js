module.exports = (server)=>{

    server.use((err,req,res,next)=>{
        
        let data = {
            '400' :{
                statusCode : '400',
                msg : 'We can not find the page you\'re looking for',
                err : err
            },
            '500': {
                statusCode : '500',
                msg : 'Internal Server Error',
                err : err
            }
        } 
        res.status(err.httpStatusCode!=undefined?err.httpStatusCode:'500').render('error',{layout : 'layouts/errorLayout',data:data[err.httpStatusCode!=undefined?err.httpStatusCode:'500']})
    })

};