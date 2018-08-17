const mongoose = require('../config/connect');
var blogSchema = mongoose.Schema;
var blog = new blogSchema({
    blogId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    time:{
        type:String,
        default:Date.now()
    },
    image:{
        type:String
    },
    desc:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    likedBy:[{
        type:String,
        default:[]
    }],
    comments:[{
        name:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }]
})

var Blog = mongoose.model('blogs',blog);

module.exports = Blog;