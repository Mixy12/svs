var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var privateRouter = require('./routes/private');
var trackRouter = require('./routes/track');
var ajaxRouter = require('./routes/ajax');
var calcRouter = require('./routes/calc');
var app = express();


app.use(session({ secret: 'keyboard cat'}));
app.use(cookieParser('kiska','mishka'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/public', express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, '/public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/private', privateRouter);
app.use('/track', require('./routes/track'));
app.use('/ajax', ajaxRouter);
app.use('/calc', calcRouter);
app.use('/contacts', require('./routes/contacts'));
app.use('/disp', require('./routes/disp'));
app.use('/requestdelivery', require('./routes/requestdelivery'));
app.use('/mydisp', require('./routes/mydisp'));
app.use('/pdfdisp', require('./routes/pdfdisp'));
app.use('/avia', require('./routes/avia'));
app.use('/cargo', require('./routes/cargo'));
app.use('/term', require('./routes/term'));
app.use('/resend', require('./routes/resend'));
app.use('/templates', require('./routes/templates'));
app.use('/callback', require('./routes/callback'));
app.use('/doc', require('./routes/doc'));
app.use('/testcoocie', require('./routes/testcoocie'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
