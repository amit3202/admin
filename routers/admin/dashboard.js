var express = require('express');
var router = express.Router();
var {checkLogin} = require('../../middleware/checkLogin')
var setCommonLocale = require('../../middleware/setCommonLocale')
var dashboard = require('../../controllers/admin/dashboard')
router.get('/dashboard',[checkLogin,setCommonLocale],dashboard.index)

module.exports = router;
