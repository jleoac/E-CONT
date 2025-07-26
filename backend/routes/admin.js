//Fichero de ruta del controlador project.js
'use strict'

var express = require('express');
var AdminController = require('../controllers/admin');
//Lo siguiente es para que se pueda subir un archivo a la base de datos de mongo
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

var router = express.Router();

router.get('/home', AdminController.home);

router.post('/test', AdminController.test);

router.post('/save-admin', AdminController.saveAdmin);

router.get('/admin/:id', AdminController.getAdmin);

router.get('/admins', AdminController.getAdmins);

router.put('/admin/:id', AdminController.updateAdmin);

router.delete('/admin/:id', AdminController.deleteAdmin);

router.post('/upload-image-admin/:id', multipartMiddleware, AdminController.uploadImage);

router.get('/get-image/:image', AdminController.getImageFile);

router.post('/login', AdminController.login);

router.get('/admin-by-email/:email', AdminController.getAdminByEmail);


module.exports = router;