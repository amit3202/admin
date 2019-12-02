module.exports = (serverInstance)=>{

    var express = require('express');
    var router = express.Router();
    var {checkLogin} = require('../../middleware/checkLogin')
    var socketInstance = require('../../middleware/chatInstance')(serverInstance);
    var adminstratorsController = require('../../controllers/admin/administrator')
    router.get('/administrator/list',[checkLogin,socketInstance],adminstratorsController.list);
    return router;
}