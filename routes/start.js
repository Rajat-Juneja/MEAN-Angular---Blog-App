var express = require('express');
var router = express.Router();
const blogOperations = require('../db/operations/blog');
var jwt = require('jsonwebtoken');
var authCheck = require('../JWTAuth/auth');
const multer = require('multer');
const uniqid =require('uniqid');
var path = require('path');
var fs = require('fs');


var http = require('http'),
    inspect = require('util').inspect;
 
var Busboy = require('busboy');

// const storageEngine = multer.diskStorage({
//     destination:'../public/src/assets/images/',
//     filename:function(req,file,callback){
//         callback(null,file.fieldname+'-'+Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({
//     storage:storageEngine,
//     limits:{fileSize:5000000}
// }).single('myimage');

const checkBus = function(req,res,next){    
    var busboy = new Busboy({ headers: req.headers });
    console.log("INSIDE BUS BOY",req.body);
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      });
    });
}

router.get('/blogs',authCheck,(req,res)=>{
    jwt.verify(req.token,'secretKeyisThis',(err,authData)=>{
          if(err){
            res.redirect('/');
          }
          else{
              blogOperations.getBlogs((err,data)=>{
                  if(err){
                      console.log(err);
                      res.json({"success":false,"message":"Couldn't load the blogs"});
                  }
                  else{
                      res.json({"success":true,"message":"Found the blogs","data":data})
                  }
              })
          }
        });
})

router.post('/addBlog',(req,res)=>{
    var Obj = {};
    Obj=req.body;
    console.log("BOdy is",req.body);
    console.log("File is",req.file);
    console.log("Files are",req.files);    
    Obj.blogId=uniqid.time();
    console.log("INSIDE ADDBLOG");
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    try{
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('Field [' + fieldname + ']');
      console.log("files are:",req.files);
      console.log("data : ",req.body);
      console.log("FILENAME IS",filename);
      var saveTo = path.join(__dirname,'/../public/src/assets/images', filename);
      console.log('Uploading: ' + saveTo);
      file.pipe(fs.createWriteStream(saveTo));
      });
    }
    catch(er){
      console.log('error');
    }
    
    busboy.on('finish', function() {
      console.log('Upload complete');
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
    return req.pipe(busboy);

    // upload(req,res,(err)=>{
    //     if(err){
    //         res.redirect('back');
    //     }
    //     else{
    //         console.log(req.file);
            
    //     }
    // })  
})


//try code
router.get('/send', function (req, res) {
    res.send('<html><head></head><body>\
               <form method="POST" enctype="multipart/form-data">\
                <input type="text" name="textfield"><br />\
                <input type="file" name="filefield"><br />\
                <input type="file" name="filefield2"><br />\
                <input type="submit">\
              </form>\
            </body></html>');
    // res.send('index', {title: 'express'})
  res.end();
});

router.post('/send', function (req, res) {
  
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    try{
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('Field [' + fieldname + ']');
      // console.log("files are:",req.files);
      // console.log("data : ",req.body);
      var saveTo = path.join(__dirname,'/../public/src/assets/images', filename);
      console.log('Uploading: ' + saveTo);
      file.pipe(fs.createWriteStream(saveTo));
      });
    }
    catch(er){
      console.log('error');
    }
    
    busboy.on('finish', function() {
      console.log('Upload complete');
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
    return req.pipe(busboy);

});


router.post('/editBlog',authCheck,(req,res)=>{
    jwt.verify(req.token,'secretKeyisThis',(err,authData)=>{
        if(err){
          res.redirect('/');
        }
        else{
            // console.log(req.body);
            blogOperations.checkLiked(req.body.blog, req.body.name, (err,data)=>{
                if(err){
                    res.redirect('back');
                }
                else{
                    console.log(data)
                    if(data.length>0){
                    blogOperations.changeLikes(-1, req.body.blog,(err,data)=>{
                        if(err){
                            res.redirect('back');
                        }
                        else{
                            blogOperations.removeLikeUser(req.body.blog, req.body.name, (err,data)=>{
                                if(err){
                                    res.redirect('back');
                                }
                                else{
                                    res.json({"success":true,"message":"Succesfully Disliked","data":data});
                                }
                            })
                        }
                    })
                }
                else{
                    blogOperations.changeLikes(1, req.body.blog, (err,data)=>{
                        if(err){
                            res.redirect('back');
                        }
                        else{
                            blogOperations.addLikeUser(req.body.blog, req.body.name, (err,data)=>{
                                if(err){
                                    res.redirect('back');
                                }
                                else{
                                    res.json({"success":true,"message":"Succesfully Liked","data":data});
                                }
                            })
                        }
                    })
                }
                }
            })
}
    })
})

router.post('/editBlogComm',authCheck,(req,res)=>{
    jwt.verify(req.token,'secretKeyisThis',(err,authData)=>{
        if(err){
          res.redirect('/');
        }
        else{
            blogOperations.addComment(req.body.comment, req.body.blogId, (err,data)=>{
                if(err){
                    console.log("ERR is",err);
                    res.redirect('back');
                }
                else{
                    res.json({"data":data})
                }
            })
        }
    })
});

router.post('/removeComm',authCheck,(req,res)=>{
    jwt.verify(req.token,'secretKeyisThis',(err,authData)=>{
        if(err){
          res.redirect('/');
        }
        else{
            blogOperations.removeComment(req.body.comment,req.body.blogId,(err,data)=>{
                if(err){
                    console.log("ERR is",err);
                    res.redirect('back');
                }
                else{
                    res.json({"data":data})
                }
            })
}
})
})

router.post('/removeBlog',authCheck,(req,res)=>{
    jwt.verify(req.token,'secretKeyisThis',(err,authData)=>{
        if(err){
          res.redirect('/');
        }
        else{
            // console.log(req.body);
            blogOperations.removeBlog(req.body.blogId,(err,data)=>{
                if(err){
                    console.log(err);
                    res.redirect('back');
                }
                else{
                    console.log(data);
                }
            })
        }
    })
})

module.exports = router;