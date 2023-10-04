var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// create route objects
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var tipsRouter = require('./routes/tips');
var recipesRouter = require('./routes/recipes');
var adviceRouter = require('./routes/advice');
var indexRouter = require('./routes/index');

// the app object
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// tell the app to use these routes
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/tips', tipsRouter);
app.use('/recipes', recipesRouter);
app.use('/advice', adviceRouter);

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

// expose this app to scripts that require it like sampleapp/bin/www
module.exports = app;
