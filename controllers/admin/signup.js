module.exports = {
    index : (req,res)=>{
        console.log(req.input('fullname'))    
        res.send(req.body.fullname)


    }
}