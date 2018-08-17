const schema= require('../schema/blog');

const blogOperations = {
    getBlogs(callback){
        console.log("INSIde call blogs");
        schema.find((err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                callback(null,data);
            }
        })
    },
    getBlog(id,callback){
        schema.findById(id,(err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                callback(null,data);
            }
        })
    },
    changeLikes(value,Obj,callback){
        schema.findByIdAndUpdate(Obj._id,{"$inc":{"likes":value}},{new:true},(err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                callback(null,data);
            }
        })
    },
    checkLiked(Obj,name,callback){
        schema.find({"likedBy":name},(err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                callback(null,data);
            }
        })
    },
    addLikeUser(Obj,user,callback){
        schema.findByIdAndUpdate(Obj._id,{"$push":{"likedBy":user}},(err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                callback(null,data);
            }
        })
    },
    removeLikeUser(Obj,user,callback){
        schema.findByIdAndUpdate(Obj._id,{"$pull":{"likedBy":user}},(err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                callback(null,data);
            }
        })
    },
    addComment(comment,id,callback){
        schema.findOneAndUpdate({"blogId":id},{"$push":{"comments":comment}},{new:true},(err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                callback(null,data);
            }
        })
    }
}

module.exports = blogOperations;