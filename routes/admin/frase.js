var express = require('express');
var router = express.Router();
var fraseModel = require('../../models/fraseModel');

var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);


/* GET from Frase page */
router.get('/', async function (req, res, next) {

  var frase = await fraseModel.getFrase();

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
        imagen: ''
      }
    }
  });

  res.render('admin/frase', {
    layout: 'admin/layout',
    usuario: req.session.usuario,
    frase
  });
});

/* eliminar */
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;

  let frase = await fraseModel.getFraseById(id);
  if (frase.img_id) {
    await (destroy(frase.img_id));
  }

  await fraseModel.deleteFraseById(id);
  res.redirect('/admin/frase')
});

/* agregar */

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});


/* captura de datos formulario */

router.get('/agregar', async (req, res, next) => {
  try {

    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (req.body.titulo != "" && req.body.frase != "") {
      await fraseModel.insertFrase({
        ...req.body, //hasta acá trae título y frase
        img_id
      });
      res.render('admin/frase')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, message: 'Complete todos los campos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true, message: 'No se cargó la frase'
    });
  }
});

/* imprime formulario de modificación */

router.get('/modificar/:id', async (req, res, next) => {
  let id = req.params.id;
  let frase = await fraseModel.getFraseById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    frase
  });
});

/* imprime modificación de la frase*/

router.get('/modificar', async (req, res, next) => {
  try {
    let img_id = req.body.img_original;
    let borrar_img_vieja = false;
    if (req.body.img.delete === "1") {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }
    if (borrar_img_vieja && req.body.img_original) {
      await (destroy(req.body.img_original));
    }


    var obj = {
      titulo: req.body.titulo,
      frase: req.body.frase,
      img_id
    }
    await fraseModel.modificarFraseById(obj, req.body.id);
    res.render('/admin/frase');
  }
  catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true, message: 'La frase no ha sido modificada'
    })
  }
})

module.exports = router;