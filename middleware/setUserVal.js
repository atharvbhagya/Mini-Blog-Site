
module.exports= (req,res,next)=>{
    //if(req.session.userId){

        res.locals.userId= req.session.userId;
    //}
    next();
};