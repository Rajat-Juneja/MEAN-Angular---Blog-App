var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var startRouter = require('./routes/start');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

// var corsOptions={
//   origin:'http://localhost:5000/',
//   optionsSuccessStatus:200
// }


app.use(cors())
// app.options('*', cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/start',startRouter);

app.use((req,res)=>{
  
  });


var server = app.listen(process.env.PORT||5000,()=>{
    console.log("Server Start at Port", server.address().port);
});


