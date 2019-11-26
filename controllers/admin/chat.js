var chatModel  =  require('../../models/admin/chat');
var mongoose = require('mongoose');
var chatController ={
    chat : (req,res)=>{
        

        var roomid = 'abc-123';//req.input('roomid')

        

        res.io.on('connection',(socket)=>{
        
           chatController.joinroom({socket,roomid},(err,joined)=>{

                if(err){

                }else{
                    console.log('Room joined')
                }

            });

            // For sending Messages

            chatController.sendMessage({socket});

            

            
            })
        
        res.render('admin/chat/panel',{layout:'layouts/admin/adminDefaultLayout'});

    },

    joinroom : ({socket,roomid},cb)=>{

        socket.join(roomid,()=>{

            console.log('Room is joined')

        });

    },

    sendMessage : ({socket})=>{

        socket.on('sendMessage',(data)=>{
            
            if(data.msg.length > 0){

                var chatData = new chatModel({
                    roomid : 'abc-123',
                    sender_id : mongoose.Types.ObjectId('5d8dba763fb2ce2d5fb07c18'),
                    receiver_id : mongoose.Types.ObjectId('5d8dbcf293caee2eb511b9bc'),
                    message : data.msg
                })

                chatData.save((err,result)=>{

                    if(err){
                        console.log(err)
                    }else{
                        chatController.newMessage({socket,chatData})
                    }

                })

            }

        })

    },

    newMessage : ({socket,chatData})=>{
        console.log('data emmitffff')
        if(chatData){
            console.log('data emmit')
            socket.emit('newMessage',chatData)
        }
        

    }


}
module.exports = chatController;