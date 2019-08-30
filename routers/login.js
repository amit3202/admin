var welcome = require('../controllers/welcome');

// Routes //
module.exports = (router)=>{
    router.get('/login',welcome.index);
};

