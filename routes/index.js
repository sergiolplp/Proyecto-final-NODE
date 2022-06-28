var express = require('express');
var router = express.Router();

/* GET del Index */
router.get('/', function (req, res, next) {
  res.render('index');
});

module.exports = router;

/* POST del Index */
var nodemailer = require('nodemailer');

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var mail = req.body.mail;
  var mensaje = req.body.mensaje;
  console.log(req.body);
  var destinatario = {
    to: 'sergiosainz.proyectos@gmail.com'
    subject: 'Mensaje de la web Coach - Cristian Garmendia'
    html: nombre + '' + 'Necesita más información sobre los talleres. Responder a: ' + mail + 'Agregó el siguiente mensaje' + mensaje + '.'
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });

  var info = await transport.sendMail(destinatario);

  res.render('index', {
    mensaje: 'Usted, envió su mensaje correctamente. Le contestaremos a la brevedad'
  });

});