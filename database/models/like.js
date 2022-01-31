const mongoose= require('mongoose');

const likeSchema= mongoose.Schema({
  'count': Number,
   'post': String
});

module.exports= mongoose.model('Like', likeSchema);