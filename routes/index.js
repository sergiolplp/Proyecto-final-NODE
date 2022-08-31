var express = require('express');
var router = express.Router();
var fraseModel = require('../models/fraseModel');
var cloudinary = require('cloudinary').v2;



/* GET de Frase */
router.get('/', async function (req, res, next) {
  var frase = await fraseModel.getFrase();
  frase = frase.splice(0, 5);

  frase = frase.map(frase => {
    if (frase.img_id) {
      const imagen = cloudinary.image(frase.img_id, {
        width: 100,
        height: 100,
        crop: 'fill'
      });
      return {
        ...frase,
        imagen
      }
    } else {
      return {
        ...frase,
        imagen: '/images/CristianGarmendia.jpg'
      }
    }
  });

  res.render('index', {
    frase
  });
});

/* GET de IMAGEN */
router.get('/', async function (req, res, next) {
  var frase = await fraseModel.getFrase();
  frase = frase.splice(0, 5);
  frase = frase.map(frase => {
    if (frase.img_id) {
      const imagen = cloudinary.url(frase.img_id, {
        width: 100,
        height: 100,
        crop: 'fill'
      });
      return {
        ...frase,
        imagen
      }
    } else {
      return {
        ...frase,
        imagen: '/images/CristianGarmendia.jpg'
      }
    }
  });

  res.render('index', {
    frase
  });
});

/* POST del Index */
var nodemailer = require('nodemailer');

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var mail = req.body.mail;
  var mensaje = req.body.mensaje;
  console.log(req.body);
  var destinatario = {
    to: 'sergiosainz.proyectos@gmail.com',
    subject: 'Mensaje de la web Coach - Cristian Garmendia',
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

  //alert(nombre + 'Usted, envió su mensaje correctamente. Le contestaremos a la brevedad');

  res.render('index', {
    mensaje: 'Usted, envió su mensaje correctamente. Le contestaremos a la brevedad'
  });
  //alert(nombre + 'Usted, envió su mensaje correctamente. Le contestaremos a la brevedad');
});

// Toma los cambios del administrador y los pasa al home

var fraseModel = require('../models/fraseModel');
router.get('/', async function(req, res, next){
  frase = await fraseModel.getFrase();
  frase = frase.splice(0,5);
  res.render('index',{
    frase
  });
});



module.exports = router;