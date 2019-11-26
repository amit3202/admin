module.exports = (serverInstance)=>{
    
    return (req,res,next)=>{
            const io = require('socket.io')(serverInstance)
            res.io = io;
            next()
        }

}