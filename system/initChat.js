module.exports = (serverInstance,server)=>{
    
    const io = require('socket.io')(serverInstance);
    server.use('/admin/chat',(req,res,next)=>{
        console.log(io)
        req.io = io;
        next();

    })

}
