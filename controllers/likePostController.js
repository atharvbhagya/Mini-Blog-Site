const Like = require("../database/models/like");
const Post = require("../database/models/Post");


// module.exports.getLike= async(req,res)=>{
//  let post= await Post.findById(req.body.postId);

//  res.json({
//      'post': post});

// };

module.exports.changeLike= async(req,res)=>{
    console.log('I was here 1!');
    try{
        if(req.query.userId ==""){
            console.log("I was inside not logged in like conroller part!");
            req.flash('loginLikefirst',"To like a post, Login to your account!");
           // res.locals.likeErr= req.flash('loginLikefirst');
            //console.log(`This is the message ${likeErr}`);
           return res.redirect('/');
        }
     
           var existingLike;
            console.log('I was here 2!');
            let post= await Post.findById(req.query.id).populate('Likes');
            
           
                console.log(post.Likes);
              
                console.log(`userId value is---> ${req.query.userId}`);
                console.log(post.createdBy);
          
              
            existingLike= await Like.findOne({user_id:req.query.userId, post_id: req.query.id});
            if(existingLike){console.log('sheesh Like boutta get yeeted!');}
      
           
            
        
            if(existingLike){
                    var index= post.Likes.indexOf(existingLike);
                    console.log(`this is the index of existing like ${index}`);
                    post.Likes.splice(index,1);
                    await Like.deleteOne({post_id:existingLike.post_id, user_id: existingLike.user_id});
                    
                    post.LikeCount-=1;
                    post.save();
                    console.log('Like deleted');
            }else{
               
                var likeInstance= new Like();
                likeInstance.post_id= req.query.id;
                console.log(`This is userId before being inputted ${req.query.userId}`);
                likeInstance.user_id= req.query.userId;
                likeInstance.save((err)=>{
                    if(err){
                        return console.log("Error in creating Like!");
                    }
                    post.Likes.push(likeInstance);
                    post.LikeCount+=1;
                    post.save();
                });
               
                console.log(`Like created by user: ${likeInstance.user_id} and on post: ${likeInstance.post_id}`);
                
            }
            res.redirect('/');
  
   
    }catch(err){
        if(err){
            console.log('I was here 3!');
            console.log('Error found-->', err);
        }
    }
    


};