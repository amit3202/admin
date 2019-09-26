const cnt = require('../config/constant');
const Cryptr = require('cryptr')
const general = {
    
    siteURL(path){
        return cnt.SITEURL+"/"+path;
    },
    getEmailValidationUrl(code,email){

        let encryptedMail = this.encryptString(email);

        return this.siteURL('validate/email/'+code+'/'+encryptedMail)
    },
    encryptString(stringtoencrypt){

        const cryptr = new Cryptr(cnt.CRYPTSECRET);
        return cryptr.encrypt(stringtoencrypt);
    },
    decryptString(stringtodecrypt){

        const cryptr = new Cryptr(cnt.CRYPTSECRET);
        return cryptr.decrypt(stringtodecrypt);
    }

}
module.exports = general;