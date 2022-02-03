const Post = require("../database/models/Post");
const User= require("../database/models/User");
const path= require('path');
module.exports= async (req,res)=>{
  
   const user= await User.findById(req.params.userId);
   console.log("This is the user-->",user);
   console.log(`The username is ${user.username} the Email is ${user.email}`);
    if(req.files == undefined){
        Post.create({title: req.body.title,
            email: user.email,
            username: user.username,
            createdBy: user._id,
            description: req.body.description,
            content:req.body.content,
            LikeCount: 0
        }, (error, post)=>{
            if(error){
               return console.log("There is error in storing Post!", error);
            }
            console.log(post.username," ", post.email);
            res.redirect('/');
        });
    }else{
        const {image}= req.files;
        image.mv(path.resolve(__dirname,'..','public/posts', image.name),(error)=>{
            Post.create({
                ...req.body,
                image: `/posts/${image.name}`
            },(error,post)=>{
                res.redirect('/');
            });
        });
        
    }
};