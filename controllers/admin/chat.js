var chatModel  =  require('../../models/admin/chat');
var mongoose = require('mongoose');
var async = require('async');
var {getChatRoomId,getChatRoomUserDetail} = require('../../helper/general');
var chatController ={
    chat : async (req,res)=>{
        
        var roomid = req.input('roomid');
        var roomDetail = await getChatRoomUserDetail(roomid,req.session.userId);
        var io =res.io;

         io.on('connection',(socket)=>{
        
            chatController.joinroom({socket,roomid},(err,rooms)=>{

                 if(err){

                    console.log("error "+err)

                 }else{
                     console.log('Room joined')
                 }

             });
            
                chatController.sendMessage({socket,roomDetail});
            
            })
        let layoutData = {
            roomDetail : roomDetail
        }
            
        res.render('admin/chat/panel',{layout:'layouts/admin/adminDefaultLayout',data:layoutData});

    },

    joinroom : ({socket,roomid},cb)=>{

        try {
            
            socket.join(roomid,()=>{
                let rooms =Object.keys(socket.rooms)
                cb(null,rooms)
                });

        } catch (error) {
            cb(error,null)
        }

    },

    sendMessage : ({socket,roomDetail})=>{

        socket.on('sendMessage',(data)=>{

            if(data.msg.length > 0){

                var chatData = new chatModel({
                    roomid : roomDetail.roomid,
                    sender_id : roomDetail.senderId,
                    receiver_id : roomDetail.receiverId,
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
        if(chatData){
            socket.broadcast.in(chatData.roomid).emit('newMessage',chatData)
        }
        

    }


}
module.exports = chatController;
