module.exports = {

    pagenotfound : (req,res,next)=>{

       try {
            throw new Error('Page Not found');
       } catch (error) {
        error.httpStatusCode = 400
        return next(error)
          }
        
    }

}