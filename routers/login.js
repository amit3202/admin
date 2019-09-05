var welcome = require('../controllers/welcome');
var express = require('express');
var router = express.Router();

router.get('/login',welcome.index);

module.exports = router;




