var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); //SESIONES


// -------FORMULARIO
require('dotenv').config();

// -------CONTROLADORES 
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var autoestimaRouter = require('./routes/autoestima');
var comocoachearteRouter = require('./routes/como-coachearte');
var entrenandolideresRouter = require('./routes/entrenando-lideres');
var altorendimientoRouter = require('./routes/equipo-altorendimiento');
var herramientasemprendedorRouter = require('./routes/herramientas-emprendedor');
var inteligenciaemocionalRouter = require('./routes/inteligencia-emocional');
var sobremiRouter = require('./routes/sobremi');
var talleresRouter = require('./routes/talleres');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/autoestima',autoestimaRouter);
app.use('/como-coachearte',comocoachearteRouter);
app.use('/entrenando-lideres',entrenandolideresRouter);
app.use('/equipo-altorendimiento',altorendimientoRouter);
app.use('/herramientas-emprendedor',herramientasemprendedorRouter);
app.use('/inteligencia-emocional',inteligenciaemocionalRouter);
app.use('/sobremi',sobremiRouter);
app.use('/talleres',talleresRouter);

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
