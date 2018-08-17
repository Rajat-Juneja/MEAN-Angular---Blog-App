const mongoose = require('../config/connect');
const userSchema = mongoose.Schema;
var user = new userSchema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    password:{
        type:String
    }
});

var User = mongoose.model('user',user);

module.exports = User;