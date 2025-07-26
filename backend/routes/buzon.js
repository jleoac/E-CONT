//Fichero de ruta del controlador project.js
'use strict'

var express = require('express');
var BuzonController = require('../controllers/buzon');
//Lo siguiente es para que se pueda subir un archivo a la base de datos de mongo
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

var router = express.Router();

router.get('/home', BuzonController.home);

router.post('/test', BuzonController.test);

router.post('/save-buzon', BuzonController.saveBuzon);

router.get('/buzon/:id', BuzonController.getBuzon);

router.get('/buzons', BuzonController.getBuzons);

router.put('/buzon/:id', BuzonController.updateBuzon);

router.delete('/buzon/:id', BuzonController.deleteBuzon);


module.exports = router;