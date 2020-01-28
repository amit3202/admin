const log4js = require('log4js');
const fs = require('fs');
const path =require('path')
module.exports = ()=>{

    log4js.configure('./config/log4js.json');
}