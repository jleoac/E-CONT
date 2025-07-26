//Fichero de ruta del controlador news.js
'use strict'

var express = require('express');
var NewsController = require('../controllers/news');
//Lo siguiente es para que se pueda subir un archivo a la base de datos de mongo
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

var router = express.Router();

router.get('/home', NewsController.home);

router.post('/test', NewsController.test);

router.post('/save-news', NewsController.saveNews);

router.get('/news/:id?', NewsController.getNews);

router.get('/newss', NewsController.getNewss);

router.put('/news/:id', NewsController.updateNews);

router.delete('/news/:id', NewsController.deleteNews);

router.post('/upload-image-news/:id', multipartMiddleware, NewsController.uploadImage_1);

router.get('/get-image/:image', NewsController.getImageFile);

module.exports = router;
