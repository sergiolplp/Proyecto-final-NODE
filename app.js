var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// -------FORMULARIO
require('dotenv').config();

// -------CONTROLADORES 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var autoestimaRouter = require('./routes/autoestima');
var comocoachearteRouter = require('./routes/como-coachearte');
var entrenandolideresRouter = require('./routes/entrenando-lideres');
var altorendimientoRouter = require('./routes/equipo-altorendimiento');
var herramientasemprendedorRouter = require('./routes/herramientas-emprendedor');
var inteligenciaemocionalRouter = require('./routes/inteligencia-emocional');
var talleresRouter = require('./routes/talleres')
var adminRouter = require('./routes/admin/frase');
var talleresRouter = require('./routes/talleres');
var session = require('express-session'); //SESIONES
var loginRouter = require('./routes/admin/login'); //ADMINISTRADOR

var fileUpload = require('express-fileupload');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'inserte clave aqui',
  resave: false,
  saveUninitialized: true
}));

//seguridad para inicio de sesión
secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) { next(); } else {
      res.redirect('/admin/login')
    }
  } catch (error) {
    console.log(error);
  }
}

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/autoestima', autoestimaRouter);
app.use('/como-coachearte', comocoachearteRouter);
app.use('/entrenando-lideres', entrenandolideresRouter);
app.use('/equipo-altorendimiento', altorendimientoRouter);
app.use('/herramientas-emprendedor', herramientasemprendedorRouter);
app.use('/inteligencia-emocional', inteligenciaemocionalRouter);
app.use('/talleres', talleresRouter);
app.use('/admin/frase',secured, adminRouter);
app.use('/admin/login', loginRouter);




// catch 404 and forward to error handler
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

module.exports = app;
