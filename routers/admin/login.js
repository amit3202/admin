var loginController = require('../../controllers/admin/login')
var signupController = require('../../controllers/admin/signup')
var express = require('express');
var router = express.Router();

router.get('/login',loginController.index);
router.post('/signup',signupController.index);

module.exports = router;
