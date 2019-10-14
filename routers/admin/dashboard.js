var express = require('express');
var router = express.Router();
var {checkLogin} = require('../../middleware/checkLogin')
var dashboard = require('../../controllers/admin/dashboard')
router.get('/dashboard',[checkLogin],dashboard.index)

module.exports = router;
