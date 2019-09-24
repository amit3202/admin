const cnt = require('../config/constant');
const general = {
    
    siteURL : (path)=>{
        return cnt.SITEURL+"/"+path;
    },

    getSignupUrl : ()=>{
        return this.call(siteURL,'test')
    }

}
module.exports = general;