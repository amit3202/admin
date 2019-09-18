var dotenv = require('dotenv');
dotenv.config();
const systemMidlleware = (server) => {



    const middlewares = {

        mergeRequest: (req, res, next) => {

            let inputHandler = (param, inputDefault) => {

                var request = Object.assign(req.body, req.params, req.query);
                var value = null;
                if (typeof param === 'string' && param === '__all__') {
                    value = request;
                } else if (typeof param === 'string' && request[param]) {
                    value = request[param];
                } else {
                    value = inputDefault;
                }

                return value;


            }

            req.input = inputHandler;
            next();
        },


        securedCheck: (req, res, next) => {
        
            next();

        },

        setSystemParameters : (req,res,next)=>{

            res.locals.sitename = process.env.SITENAME;
            next();

        }

    };

    Object.keys(middlewares).map((mdlware) => {

        server.use(middlewares[mdlware])

    })

}

module.exports = systemMidlleware;