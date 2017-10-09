/**
  Module Dependencies

  Mongoose will be our connection to MongoDB.
  body-parser is used to examine POST calls.
  method-override is used by express to create DELETE and PUT requests through forms.
*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var mongo = require('./model/mongo');
var user = require('./model/user');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

// The 'body-parser' middleware only handles JSON and urlencoded data, not multipart
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/users', users);

app.get('/arpit', function(req,res){
	res.sendFile(path.join(__dirname + '/html/' + '/arpit.html'));
});

//============FILE DOWNLOAD===========
// /files/* is accessed via req.params[0]
// but here we name it :file
app.get('/:file(*)', function(req, res, next){
  var file = req.params.file
    , path = __dirname + '/files/' + file;

  res.download(path);
});

//===========ERROR HANDLERS==========
// error handling middleware. Because it's below our routes, you will be able to "intercept" errors, otherwise Connect will respond with 500 "Internal Server Error".
app.use(function(err, req, res, next){
  // special-case 404s,
  // remember you could
  // render a 404 template here
  if (404 == err.status) {
    res.statusCode = 404;
    res.send('Cant find that file, sorry!');
  } else {
    next(err);
  }
});

/* Alternative code for 404 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('pages/error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
