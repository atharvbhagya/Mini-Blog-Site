const mongoose= require('mongoose');

const PostSchema= new mongoose.Schema({
   // _id: new mongoose.Types.ObjectId(),
    'title': String,
    'description': String,
    'content': String,
    'username': String,
    'email': String,
    'image': String,
    'LikeCount': Number,
    'createdAt' : {
        type: Date,
        default: new Date()
    },
    'Likes':[{
        'type':mongoose.Schema.Types.ObjectId ,
        'ref': 'Like'
    }],
    'createdBy':{
        'type': mongoose.Schema.Types.ObjectId,
        'ref': 'User'
    }
});

const Post= mongoose.model('Post', PostSchema);

module.exports= Post;