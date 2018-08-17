var express = require('express');
var router = express.Router();
const blogOperations = require('../db/operations/blog');
var jwt = require('jsonwebtoken');
var authCheck = require('../JWTAuth/auth');


router.get('/',authCheck,(req,res)=>{
    console.log("INSIDE START");
})

// router.get('/blogs',(req,res)=>{
//     console.log("inside node");
// })

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
            console.log("INSIDE EDIT COMENTS");
            blogOperations.addComment(req.body.comment, req.body.blogId, (err,data)=>{
                if(err){
                    console.log("ERR is",err);
                    res.redirect('back');
                }
                else{
                    console.log("Data o blog is",data);
                    res.json({"data":data})
                }
            })
        }
    })
});

module.exports = router;