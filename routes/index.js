var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(__dirname+'/../public/src/app/index.html');
  // res.sendFile('../public/src/app/index.html');
});

module.exports = router;
