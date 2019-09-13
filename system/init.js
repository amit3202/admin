const express = require('express');
const app = new express();
const {PORT,VIEWENGINE} =  require('../config/config');
const db = require('../config/database');
const path = require('path') 

//Initialse System Middlewares //
const systemMidlleware = require('./middleware/system');
systemMidlleware(app);


// Initialise Body-parser package to grab POST data //
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Support Json encoded Bodies
app.use(bodyParser.urlencoded({ extended : true})); // Support URL encoded Bodies


//Initialise session //
const initSession = require('./session/session');
initSession(app);

// initialise Passport //
const initPassport = require('./passport/passport');
initPassport(app)

//import Routes //
const initRoutes = require('../routers/route');
initRoutes(app);

// Initialisng View Engine //
const initialiseViewEngine = ()=>{

    // Set Paths For views & Static server //
    console.log(path.join(__dirname,"../assets"))
    app.use(express.static(path.join(__dirname,"../public")))
    app.set("views", path.join(__dirname, "../views"));    
    app.set('view engine',VIEWENGINE);
    console.log('View engine '+VIEWENGINE+" initalised")
}

const initServer = ()=>{

    //check port and initialise on another port (pending) //

    app.listen(PORT,(err)=>{

        if(err){
            console.log('Error in server 11242 : ' +err)
        }else{
            console.log('Server runnning on Port '+PORT)
            initialiseViewEngine();
        }
    
    })

}

module.exports = initServer;
