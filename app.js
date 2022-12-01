var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var mongoose = require('mongoose');
//var mongodb = require('mongodb');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var indexRouter = require('./routes/index');
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy)(
  function(username, password, done) { 
    Account.findOne({ username: username }, function (err, user) { 
      if (err) { return done(err); } 
      if (!user) { 
        return done(null, false, { message: 'Incorrect username.' }); 
      } 
      if (!user.validPassword(password)) { 
        return done(null, false, { message: 'Incorrect password.' }); 
      } 
      return done(null, user); 
  });
}
);



require('dotenv').config(); 
const connectionString =  process.env.MONGO_CON 
mongoose = require('mongoose'); 
mongoose.connect(connectionString,  
{
  useNewUrlParser: true, 
  useUnifiedTopology: true
}); 

//Get the default connection 
var db = mongoose.connection; 

//Bind connection to error event  
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 
db.once("open", function(){ 
  console.log("Connection to DB succeeded")
});


var resourceRouter = require('./routes/resource');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var balloonRouter = require('./routes/balloon');
var gridbuildRouter = require('./routes/gridbuild');
var selectorRouter = require('./routes/selector');
const balloon = require('./models/Balloon');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ 
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false 
}));
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(express.static(path.join(__dirname, 'public')));

var Account =require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/balloon',balloonRouter);
app.use('/gridbuild', gridbuildRouter);
app.use('/selector', selectorRouter);
app.use('/resource',resourceRouter);


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


app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// for a specific hat. 
exports.balloon_detail = async function(req, res) { 
  console.log("detail"  + req.params.id) 
  try { 
      result = await balloon.findById( req.params.id) 
      res.send(result) 
  } catch (error) { 
      res.status(500) 
      res.send(`{"error": document for id ${req.params.id} not found`); 
  } 
}; 

module.exports = app;
