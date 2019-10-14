var loginController = require('../../controllers/admin/login')
var signupController = require('../../controllers/admin/signup')
var signupValidationRules = require('../../valiadtionrules/admin/signup')
var express = require('express');
var router = express.Router();
var {checkExistinglogin} = require('../../middleware/checkLogin')

router.get(['/','/login','/signup'],checkExistinglogin,loginController.index);
router.post('/login',loginController.login);
router.post('/signup',signupValidationRules,signupController.index);

module.exports = router;
