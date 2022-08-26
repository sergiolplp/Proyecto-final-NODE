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


module.exports = router;