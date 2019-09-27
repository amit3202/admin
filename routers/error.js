var express = require('express');
var router = express.Router();
var error = require('../controllers/error');
module.exports = router.get('*',error.pagenotfound);
