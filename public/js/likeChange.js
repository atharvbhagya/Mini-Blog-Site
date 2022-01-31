//const Post= require('../../database/models/Post');


$(function(){
 $('.fa-thumbs-up').on('click', function(event){
     $.getJSON('/post/like' ,function(post){
         //let post= await Post.findById(likeId);
         var count=post.Like.likeCount;
         if(jsonData.likeable){
            post.Like.Likeable=false;
            post.Like.count = ++(count);
         }else{
            post.Like.Likeable=true;
            post.Like.count= --(count);
         }
        $('#postNo').html(`Posted by
        <a href="#">${ post.username }</a>
        on ${ post.createdAt.toDateString()} 
        <button class="like">
        
          <i class="far fa-thumbs-up" id="${post._id}"></i>
        </button>
       ${count}
        <button class="dislike">
          <i class="far fa-thumbs-down"></i>
        </button>
        20
        
        
        `);
        $.post( '/post/changeLike',{
            'postId': likeId,
            'likeable':post.Like.Likeable,
            'count': post.Like.count
        }, function(data, status){
            console.log(data);
        }
         
        );
     });

     
 });
});

