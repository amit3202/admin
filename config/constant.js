const config = {
    PORT : '3202',
    DBNAME : 'schools',
    VIEWENGINE : 'ejs' 
}
const emailType = {

    SIGNUPVERIFICATION : 'signupVerification'

}


module.exports = Object.assign(config,emailType);

