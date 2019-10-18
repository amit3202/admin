const config = {
    PORT : '3202',
    DBNAME : 'schools',
    VIEWENGINE : 'ejs',
}

const systemConfig = {
    SITEURL : 'http://localhost:'+config.PORT+"/",
    CRYPTSECRET : 'qwertyuiop' 
}

const emailType = {

    SIGNUPVERIFICATION : 'signupVerification'

}


module.exports = Object.assign(config,emailType,systemConfig);

