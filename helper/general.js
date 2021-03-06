const cnt = require('../config/constant');
const Cryptr = require('cryptr')
const general = {
    
    siteURL(path){
        return cnt.SITEURL+path;
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
    },
    getChatRoomId(userArray=null){
       
        if(userArray == null) return null;

        try {
            
            let str = userArray.split(',').sort().join(',');
            let roomid = general.encryptString(str);
            return roomid;

        } catch (error) {
            
            return null;
        }
    },
    getChatRoomUserDetail(roomid,loggedInUser)
    {
        try {
            
            let otherId =general.decryptString(roomid).split(',').filter((id)=>{
                if(id != loggedInUser){
                    return true;
                }
            }).toString()

            if(otherId && loggedInUser){

                return {
                    'senderId' : loggedInUser,
                    'receiverId' : otherId,
                    'roomid' : roomid
                }

            }else{
                return null;
            }

            

        } catch (error) {
            
            return null;

        }
            
    


}

}
module.exports = general;