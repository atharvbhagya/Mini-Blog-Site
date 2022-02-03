
const bcrypt= require('bcrypt');

const mongoose= require('mongoose');

const UserSchema= new mongoose.Schema({
   // _id: new mongoose.Types.ObjectId(),
    'username':{
        type: String,
        required: true
    },
    'email': {
        type: String,
        required: true
    },
    'password': {
        type: String,
        required: true
    }
    
});

UserSchema.pre('save', function(next){
    const user= this;
    bcrypt.hash(user.password,15, (error,encrypted)=>{
        user.password= encrypted;
        next();
    });
});


const User= mongoose.model('User', UserSchema);
module.exports = User;