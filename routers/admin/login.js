var loginController = require('../../controllers/admin/login')
var signupController = require('../../controllers/admin/signup')
var signupValidationRules = require('../../valiadtionrules/admin/signup')
var express = require('express');
var router = express.Router();

router.get(['/','/login','/signup'],loginController.index);
router.post('/login',loginController.login);
//router.post('/signup',signupController.index);
router.post('/signup',signupValidationRules,signupController.index);

module.exports = router;
