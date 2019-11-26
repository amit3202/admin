module.exports = (serverInstance)=>{

        var express = require('express');
        var router = express.Router();
        var {checkLogin} = require('../../middleware/checkLogin')
        var socketInstance = require('../../middleware/chatInstance')(serverInstance);
        var chatController = require('../../controllers/admin/chat')
        router.get('/chat',[checkLogin,socketInstance],chatController.chat);
        return router;
}