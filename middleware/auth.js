const User = require("../database/models/User");


module.exports= (req,res, next)=>{
  User.findById(req.session.userId, (error,user)=>{
    if(error|| !user){
      console.log('I was here!');
        return res.redirect('/');
    }
    next();
  });
};