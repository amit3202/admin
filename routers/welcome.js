var welcome = require('../controllers/welcome');
var express = require('express');
var router = express.Router();

router.get('/',welcome.index);

module.exports = router;




