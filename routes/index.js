var express = require('express');
var router = express.Router();
const userOperations = require('../db/operations/user');
var bcrypt = require('bcrypt');

router.post('/createUser', function(req, res) {
  var Obj = {};
  Obj=req.body;
  bcrypt.hash(Obj.password,10,(err,hash)=>{
    if(err){
      res.json({"success":false,"message":"Couldn't sign you up"});
    }
    else{
      // console.log(Obj.password);
      Obj.password=hash;
      userOperations.addUser(Obj,(err,data)=>{
        if(err){
          res.json({"success":false,"message":"Couldn't Sign you up."});
        }
        else{
          res.json({"success":true,"message":"Successful"});
        }
      })
    }
  })

});

router.post('/getUser',(req,res)=>{
var Obj = {};
Obj = req.body;
userOperations.findUser(Obj.email,(err,data)=>{
  if(err){
    res.json({"success":false,"message":"Couldn't log in"});
  }
  else{
    if(data.length>0){
    bcrypt.compare(Obj.password,data[0].password,(err,data)=>{
      if(err){
        res.json({"success":false,"message":"Wrong Password"});
      }
      else{
        res.json({"success":false,"message":"You've successfully logged in.","data":data[0]});
      }
    })
  }
  else{
    res.json({"success":false,"message":"Email id not registered"});
  }
  }
})
})

module.exports = router;
