const mongoose= require('mongoose');

const likeSchema= new mongoose.Schema({
 // _id: new mongoose.Types.ObjectId(),
  'user_id': {
    'type': mongoose.Schema.Types.ObjectId,
    required: true,
    'ref': 'User'
  },
   'post_id':{
     'type': mongoose.Schema.Types.ObjectId,
     required: true,
     'ref': 'Post'
   }
});


const Like= mongoose.model('Like', likeSchema);
module.exports= Like;