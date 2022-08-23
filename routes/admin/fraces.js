var express = require('express');
var router = express.Router();
var fracesModel = require('./../../models/usuariosModel');

/* GET from Fraces page */
router.get('/', function(req, res, next) {

var fraces = await usuariosModel.getFraces();

  res.render('admin/fraces',{
    layout:'admin/layout',
    usuario: req.session.usuario,
    fraces
  });
});

/* eliminar */
router.get('/eliminar/:id', async (req, res, next) -> {
  var id =  req.params.id;
   await usuariosModel.deleteFracesById(id);
   res.redirect('/admin/fraces')
    });


module.exports = router;