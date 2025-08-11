//Fichero de ruta del controlador project.js
'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');
//Lo siguiente es para que se pueda subir un archivo a la base de datos de mongo
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

var router = express.Router();

router.get('/home', ProjectController.home);

router.post('/test', ProjectController.test);

router.post('/save-project', ProjectController.saveProject);

router.get('/project/:id?', ProjectController.getProject);

router.get('/projects', ProjectController.getProjects);

router.put('/project/:id', ProjectController.updateProject);

router.delete('/project/:id', ProjectController.deleteProject);

router.post('/upload-image/:id', upload.single('image'), ProjectController.uploadImage);

router.get('/get-image/:image', ProjectController.getImageFile);

module.exports = router;
