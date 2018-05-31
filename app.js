var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// passport
var passport = require('passport');
// express-session
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var auth = require('./routes/auth');

var app = express();
// passport-google-oauth
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// clientID and ClientSecret we will setup in the google console to let google know who
// we are
//callBackURL is what google send back to once they are done authenticating
//function will called when google send something back to that callback url
//
passport.use(new GoogleStrategy({
  clientID: '1005763665330-ea844l701sskj02nivelk9ka4dqmnih3.apps.googleusercontent.com',
  clientSecret:'wzG-_8pLqYbKYPE0pbGZBHkV',
  callbackURL:'http://localhost:3000/auth/google/callback'},
  function (req, accessToken, refreshToken, profile, done) {
   
  }
));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//express-session
app.use(session({secret:'anything'}));
// passport
app.use(passport.initialize());
app.use(passport.session());
//passport use serialize method to place the user object in session
passport.serializeUser(function(user,done){
  done(null,user);
});

passport.deserializeUser(function(user,done){
  done(null,user);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', auth);

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

module.exports = app;
