var express = require('express');
var router = express.Router();
var checkLogin = require('../../middleware/checkLogin')

router.use(checkLogin)

router.get('/dashboard',(req,res)=>{

    res.send('dash')

})

module.exports = router;
