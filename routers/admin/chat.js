
var express = require('express');
var router = express.Router();
var {checkLogin} = require('../../middleware/checkLogin')
var chatController = require('../../controllers/admin/chat')
router.get('admin/chat',[checkLogin],chatController.chat);
module.exports = router;