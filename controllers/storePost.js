const Post = require("../database/models/Post");
const path= require('path');
module.exports= (req,res)=>{
  
   
    if(req.files == undefined){
        Post.create(req.body, (error, post)=>{
            if(error){
                console.log("There is error in storing Post!", error);
            }
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