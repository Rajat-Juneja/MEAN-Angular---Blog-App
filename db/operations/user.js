const schema = require('../schema/user');

const dbOperations = {
    findUser(email,callback){
        schema.find({"email":email},(err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                callback(null,data);
            }
        })
    },
    loginUser(Obj,callback){
        schema.find({"email":Obj.email,"password":Obj.password},(err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                callback(null,data);
            }
        })
    },
    addUser(Obj,callback){
        schema.find({"email":Obj.email},(err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                console.log("INSIDE NOt FOUND",data.length);
                if(data.length==0){
                    console.log("INSIDE CREATION");
                schema.create(Obj,{new:true},(err,data)=>{
                    if(err){
                        callback(err,null);
                    }
                    else{
                        callback(null,data);
                    }
                })
            }
            else{
                console.log("INSIDE UpdaTION");
                schema.findOneAndUpdate({"email":Obj.email},{new:true},(err,data)=>{
                    if(err){
                        callback(err,null);
                    }
                    else{
                        callback(null,data);
                    }
                })
            }
            }
        })
       
    },
    deleteUser(email,callback){
        schema.findOneAndRemove({"email":email},(err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                callback(null,data);
            }
        })
    }
}

module.exports = dbOperations;