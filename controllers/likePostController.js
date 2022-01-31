const Post = require("../database/models/Post");


module.exports.getLike= async(req,res)=>{
 let post= await Post.findById(req.body.postId);

 res.json({
     'post': post});

};

module.exports.changeLike= async(req,res)=>{
    let post= await Post.findById(req.body.postId);

    post.Like.count= req.body.count;
    post.Like.Likeable= req.body.likeable;

    res.end('{"success" : "Updated Successfully", "status" : 200}');

};