var express = require('express');
var validate = require('../../controllers/validate')
var router = express.Router();
router.get('/email/:validationcode/:encryptedemail',validate.validateAdminActivationEmail);
router.get('/confirm/:reqtype',validate.afterValidation);
module.exports = router;