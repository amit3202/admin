var welcome = require('../../../controllers/welcome');
var express = require('express');
var router = express.Router();

router.get('/user',welcome.index);

module.exports = router;




