
var express = require('express');
var router = express.Router();
var {checkLogin} = require('../../middleware/checkLogin')
var menuController = require('../../controllers/admin/menu');
router.get('/menu/dummy',[checkLogin],menuController.generateDummyData)
router.get('/menu/getmenu',[checkLogin],menuController.getmenu);
//router.get('/menu/list',[checkLogin],menuController.list);
router.get('/menu/add',[checkLogin],menuController.add);
router.post('/menu/add',[checkLogin],menuController.addMenu);

module.exports = router;
