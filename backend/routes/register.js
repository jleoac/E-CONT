//Fichero de ruta del controlador project.js
'use strict'

var express = require('express');
var RegisterController = require('../controllers/register');
var ProjectController = require('../controllers/project');
//Lo siguiente es para que se pueda subir un archivo a la base de datos de mongo
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

var router = express.Router();

router.get('/home', RegisterController.home);

router.post('/test', RegisterController.test);

router.post('/save-register', RegisterController.saveRegister);

router.get('/register/:id', RegisterController.getRegister);

router.get('/registers', RegisterController.getRegisters);

router.put('/register/:id', RegisterController.updateRegister);

router.put('/project/:id', ProjectController.updateProject);

router.post('/upload-image/:id', multipartMiddleware, RegisterController.uploadImage);

router.get('/get-image/:image', RegisterController.getImageFile);

router.delete('/register/:id', RegisterController.deleteRegister);


module.exports = router;
