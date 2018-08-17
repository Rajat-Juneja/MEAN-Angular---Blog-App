var express = require('express');
var router = express.Router();
const userOperations = require('../db/operations/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post('/createUser', function(req, res) {
  var Obj = {};
  Obj=req.body;
  bcrypt.hash(Obj.password,10,(err,hash)=>{
    if(err){
      res.json({"success":false,"message":"Couldn't sign you up"});
    }
    else{
      console.log(Obj);
      Obj.password=hash;
      userOperations.addUser(Obj,(err,data)=>{
        if(err){
          console.log(err);
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
    res.json({"success":false,"message":"Couldn't log in","data":{},"token":''});
  }
  else{
    if(data.length>0){
      console.log("INPUT PASS IS",Obj.password);
      console.log("DB PASS IS",data[0].password);
    bcrypt.compare(Obj.password,data[0].password,(err,checked)=>{
      if(err){
        res.json({"success":false,"message":"Wrong Password","data":{},"token":''});
      }
      else{
        if(checked){
        jwt.sign({user:data[0]},'secretKeyisThis',(err,token)=>{
          if(err){
            res.json({"success":false,"message":"Couldn't log in","data":{},"token":''});
          }
          else{
            res.json({"success":true,"message":"You've successfully logged in.","data":data[0],"token":token});
          }
        })
      }
      else{
        res.json({"success":false,"message":"Couldn't log in","data":{},"token":''});
      }

      }
    })
  }
  else{
    res.json({"success":false,"message":"Email id not registered","data":{}});
  }
  }
})
})

// router.post('/blogusername',(req,res)=>{
//   console.log("BODY IS",req.body.email);
//   userOperations.findUser(req.body.email,(err,data)=>{
//     if(err){
//       res.json({"success":false,"message":"Error in finding name","name":''});
//     }
//     else{
//       console.log(data);
//       res.json({"success":true,"message":"Found the name","name":data.name})
//     }
//   })
// })

// function verifyToken(req,res,next){
//   const Headers = req.headers['authorization'];
//   if(typeof Headers !== undefined){
//     const headerpart = Headers.split(' ');
//     const header = headerpart[1];
//     req.token = header;
//     next();
//   }
//   else{
//     res.redirect('/');
//   }
// }

// jwt.verify(req.token,'secretKeyisThis',(err,authData)=>{
//   if(err){
//     res.redirect('/');
//   }
//   else{
//     // doOps
//   }
// });

module.exports = router;
