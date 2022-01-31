
module.exports= (req,res,next)=>{
    res.locals.userId= req.session.userId;
    next();
};