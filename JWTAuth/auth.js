const jwt =require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const Headers = req.headers['authorization'];
    if(typeof Headers !== undefined){
      const headerpart = Headers.split(' ');
      const header = headerpart[1];
      req.token = header;
      console.log("INSIDE JWT AUTH DONE");
      next();
    }
    else{
        console.log("DIDn't GeT HEADER");
      res.redirect('/');
    }
  }
