var express = require('express');
var router = express.Router();
var usuariosModels = require('./../models/usuariosModel');

router.get('/', function (req, res, next) {
    res.render('admin/login',{layout:'admin/layout'});
  });


router.post('/', async (req, res, next) => {
  try {
    var usuario = req.body.usuario;
    var password = req.body.password;
    console.log(req.body);

    var data = await usuariosModels.getUserAndPassword (usuario, password);

    if (data != undefined) {
      res.redirect('admin/talleres');}
      else {
        res.render('admin/login', {
          layout: 'admin/layout',
          error: true
        })
      }
  } catch (error) {
    console.log (error)
  }
});

  module.exports = router;