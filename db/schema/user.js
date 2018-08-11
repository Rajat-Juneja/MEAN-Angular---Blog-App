const mongoose = require('../config/connect');
const userSchema = mongoose.Schema;
var user = new userSchema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

var User = mongoose.model('user',user);

module.exports = User;