var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var sampleRouter = require('./routes/sample');
var ticketBoxRouter = require('./routes/ticketbox');
var suiBlockChainRouter = require('./routes/sui_blockchain/rpc_mainet/balance_check.js');
//var xCreateTweetRouter = require('./routes/twitter/create_tweet');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));
//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sample', sampleRouter);
app.use('/ticketBox', ticketBoxRouter);
app.use('/sui-blockchain', suiBlockChainRouter);
// app.use('/x/Tweet', xCreateTweetRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  res.json({});
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
