var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const pool = require("./db")
var path = require ('path');

var userRouter = require('./routes/user');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');
var searchpdfRouter = require('./routes/searchpdfadmin');
var newUserRouter = require('./routes/addnewuser');
var loginUserRouter = require('./routes/loginuser');
var searchpdfuserRouter = require('./routes/searchpdfuser');

var app = express();
app.use(express.static(__dirname + '../public'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/searchpdfadmin', searchpdfRouter);
app.use('/newuser', newUserRouter);
app.use('/loginuser', loginUserRouter);
app.use('/user',userRouter);
app.use('/searchpdfuser',searchpdfuserRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
