var chatModel  =  require('../../models/admin/chat');
var mongoose = require('mongoose');
var async = require('async');
var {getChatRoomId,getChatRoomUserDetail} = require('../../helper/general');
var chatController ={
    
    chat : async (req,res,next)=>{
        
        var roomid = req.input('roomid');
        var logedInuserId = req.session.userId;
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
                chatController.readCurrentMessage({socket});
                chatController.readPendingMessage({socket,roomid,logedInuserId});


            
            })

          
            try {
                 
                var chatHistory = await new Promise((resolve,reject)=>{

                    chatModel.aggregate([
                
                        {$match : {
                            $and : [
                                {deleted_at : null},
                                {roomid : roomid}
                            ]
                        }},
                        {$project : {
                            roomid : 1,
                            sender_id : 1,
                            receiver_id : 1,
                            read_at : {
                                $cond : {
                                    if : {$ne : ['$read_at',null]},
                                        then : {$dateToString: { format: "%Y-%m-%d at %H:%M", date: "$read_at" }},
                                        else : null
                                }
                            },
                            created_at : {$dateToString: { format: "%Y-%m-%d at %H:%M", date: "$created_at" }},
                            message : 1,
                            msgType : {
                                $cond : {
                                    if : {
                                       $eq : [ '$sender_id', mongoose.Types.ObjectId(req.session.userId)]
                                    },
                                    then : 'out',
                                    else : 'in'
                                }
                            }
    
    
                            
    
    
                        }},
                        {$sort : {
                            created_at : 1
                        }},
                        {
                            $lookup : {
                                from : "users",
                                localField : 'sender_id',
                                foreignField : '_id',
                                as : 'senderDetail'
                            }
                        },
                        {
                            $unwind : {
                                    path : '$senderDetail'
                            }
                        },
                        {
                            $lookup : {
                                from : "users",
                                localField : 'receiver_id',
                                foreignField : '_id',
                                as : 'receiverDetail'
                            }
                        },
                        {
                            $unwind : {
                                path : "$receiverDetail"
                            }
                        },
                        {
                            $project : {
                                roomid : 1,
                                sender_id : 1,
                                receiver_id : 1,
                                created_at : 1,
                                read_at : 1,
                                message : 1,
                                msgType : 1,
                                senderName : "$senderDetail.personal.fullname",
                                receiverName : "$receiverDetail.personal.fullname"        
                            }
                        }
                        
                ]).exec((err,result)=>{
    
                    if(err){
                       reject(err)
                    }else{
                        resolve(result)
                    }
    
                })

                })
                
            } catch (error) {
                
                error.httpStatusCode = 500;
                next(error)
            }



        let layoutData = {
            roomDetail : roomDetail,
            chatHistory : chatHistory
        }
        console.log(layoutData)
        
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
        

    },

    readCurrentMessage : ({socket})=>{
        
        socket.on('readCurrent',(data)=>{

            if(data.msgId != undefined){

                chatModel.updateOne({'_id':data.msgId},{$set : {read_at : Date.now()} }).exec((err,res)=>{

                   if(err){
                       console.log('error in reading',err)
                   }

                })

            }
        })

    },

    readPendingMessage : ({socket=null,roomid=null,logedInuserId=null})=>{

        socket.on('readPending',(data)=>{

            if(socket != null && roomid != null && logedInuserId != null){
              
                chatModel.updateMany({$and : [{
                    'receiver_id' : mongoose.Types.ObjectId(logedInuserId) 
                },
                {
                    'roomid': roomid
                },{
                   'read_at' : {$eq:null}
                }]},{$set : {read_at : Date.now()}}).exec((err,res)=>{
                    console.log('updated')
                })

            }
            
        })

    }


}
module.exports = chatController;
