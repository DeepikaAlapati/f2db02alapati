var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Balloon = require('./models/Balloon');



require('dotenv').config(); 
const connectionString =  process.env.MONGO_CON 
mongoose = require('mongoose'); 
mongoose.connect(connectionString,  
{useNewUrlParser: true, 
useUnifiedTopology: true}); 

//Get the default connection 
var db = mongoose.connection; 

//Bind connection to error event  
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 
db.once("open", function(){ 
  console.log("Connection to DB succeeded")
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var balloonRouter = require('./routes/balloon');
var gridbuildRouter = require('./routes/gridbuild');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/balloon',balloonRouter);
app.use('/gridbuild', gridbuildRouter);
app.use('/selector', selectorRouter);
app.use('/resource',resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function recreateDB(){ 
  // Delete everything 
  await Balloon.deleteMany(); 
  let instance1 = new 
  Balloon({
    balloon_color: "black",
    balloon_type:"large",
    balloon_size : 7
  }); 
  let instance2 = new 
  Balloon({
    balloon_color: "blue",
    balloon_type:"small",
    balloon_size : 5
  }); 
  let instance3 = new 
  Balloon({
    balloon_color: "purple",
    balloon_type:"medium",
    balloon_size : 10,
  }); 
  instance1.save( function(err,doc) { 
    if(err) return console.error(err); 
    console.log("First Balloon object saved") 
  });
  instance2.save( function(err,doc) { 
    if(err) return console.error(err); 
    console.log("Second Balloon object saved") 
  });
  instance3.save( function(err,doc) { 
      if(err) return console.error(err); 
      console.log("Third Balloon object saved") 
  }); 
} 

let reseed = true; 
if (reseed) { 
  recreateDB();
} 

module.exports = app;
