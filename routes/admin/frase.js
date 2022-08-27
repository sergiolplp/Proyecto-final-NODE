var express = require('express');
var router = express.Router();
var fraseModel = require('../../models/fraseModel');

/* GET from Frase page */
router.get('/', async function(req, res, next) {

var fraces = await fraseModel.getFrase();

  res.render('admin/frase',{
    layout:'admin/layout',
    usuario: req.session.usuario,
    frase
  });
});

/* eliminar */
router.get('/eliminar/:id', async (req, res, next) => {
  var id =  req.params.id;
   await fraseModel.deleteFraseById(id);
   res.redirect('/admin/frase')
    });

/* agregar */

router.get('/agregar', (req, res, next)=>{
  res.render('admin/agregar',{
    layout: 'admin/layout'
  });
});


/* captura de datos formulario */

router.get('/agregar', async (req, res, next)=>{
  try{
    if(req.body.titulo !="" && req.body.frase !=""){
      await fraseModel.insertFrace(req.body);
      res.render('/admin/frase')
    }else{
      res.render('admin/agregar',{
        layout: 'admin/layout',
        error: true, message: 'Complete todos los campos'
    })
  }
} catch (error){
  console.log(error)
  res.render('admin/agregar', {
    layout:'admin/layout',
    error: true, message: 'No se cargó la frase'
  });
}
});

/* imprime formulario de modificación */

router.get('/modificar/:id', async (req, res, next)=>{
  let id = req.params.id;
  let frase = await fraseModel.getFraseById(id);
  res.render('admin/modificar', {
    layout:'admin/layout',
    frase
  });
}); 

/* imprime modificación de la frase*/

router.get('/modificar', async (req, res, next)=>{
  try{
    let obj = {
      titulo: req.body.titulo,
      frase: req.body.frase
    }
      await fraseModel.modificarFraseById(obj,req.body.id);
      res.render('/admin/frase');
    }
    catch (error) {
      console.log(error)
      res.render('admin/modificar',{
        layout: 'admin/layout',
        error: true, message: 'La frase no ha sido modificada'
    })
  }
  })

module.exports = router;